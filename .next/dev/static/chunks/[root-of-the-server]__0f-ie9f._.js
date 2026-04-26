(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/utils/getNodes.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNodes",
    ()=>getNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/d3/src/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/d3-array/src/group.js [client] (ecmascript)");
;
function getNodes({ rawData }) {
    const nodes = [];
    const heartDisease = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.heart_disease);
    // console.log("heartDisease", heartDisease);
    // nodes.push({name: "no_heartDisease", value: heartDisease[0][1].length/rawData.length});
    nodes.push({
        name: "heartDisease",
        value: heartDisease[0][1].length
    });
    const married = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.ever_married);
    // console.log("married", married);
    nodes.push({
        name: "ever_married",
        value: married[0][1].length
    });
    nodes.push({
        name: "never_married",
        value: married[1][1].length
    });
    const hypertension = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.hypertension);
    // console.log("hypertension", hypertension);
    // nodes.push({name: "no_hypertension", value: hypertension[0][1].length/rawData.length});
    nodes.push({
        name: "hypertension",
        value: hypertension[1][1].length
    });
    const gender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.gender);
    // console.log("gender", gender);
    nodes.push({
        name: "male",
        value: gender[0][1].length
    });
    nodes.push({
        name: "female",
        value: gender[1][1].length
    });
    const stroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.stroke);
    // console.log("stroke", stroke);
    nodes.push({
        name: "stroke",
        value: stroke[0][1].length
    });
    // nodes.push({name:"no_stroke", value: stroke[1][1].length/rawData.length});
    // nodes.push({name:"otherGender", value: gender[2][1].length})    
    return nodes;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/getLinks.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLinks",
    ()=>getLinks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/d3/src/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/d3-array/src/group.js [client] (ecmascript)");
;
function getLinks({ rawData }) {
    const links = [];
    const genderHeartDisease = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.gender, (d)=>d.heart_disease);
    // console.log("genderHeartDisease", genderHeartDisease);
    links.push({
        source: "male",
        target: "heartDisease",
        value: genderHeartDisease[0][1][0][1].length
    });
    links.push({
        source: "female",
        target: "heartDisease",
        value: genderHeartDisease[0][1][1][1].length
    });
    const heartDiseaseStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.stroke);
    // console.log("heartDiseaseStroke", heartDiseaseStroke);
    links.push({
        source: "heartDisease",
        target: "stroke",
        value: heartDiseaseStroke[0][1][0][1].length
    });
    // links.push({source: "heartDisease" , target: "female", value: heartDiseaseGender[0][1][1][1].length/(heartDiseaseGender[0][1][0][1].length+heartDiseaseGender[0][1][1][1].length)});
    const heartDiseaseHypertension = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.hypertension);
    // console.log("heartDiseaseHypertension", heartDiseaseHypertension);
    links.push({
        source: "heartDisease",
        target: "hypertension",
        value: heartDiseaseHypertension[0][1][1][1].length
    });
    const heartDiseaseMarried = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.ever_married);
    // console.log("heartDiseaseMarried", heartDiseaseMarried);
    links.push({
        source: "heartDisease",
        target: "ever_married",
        value: heartDiseaseMarried[0][1][0][1].length
    });
    links.push({
        source: "heartDisease",
        target: "never_married",
        value: heartDiseaseMarried[0][1][1][1].length
    });
    const strokeGender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.stroke_disease, (d)=>d.gender);
    // console.log("heartDiseaseGender", heartDiseaseGender[0][1][1]);
    links.push({
        source: "stroke",
        target: "male",
        value: strokeGender[0][1][0][1].length
    });
    links.push({
        source: "stroke",
        target: "female",
        value: strokeGender[0][1][1][1].length
    });
    // links.push({source: "heartDisease" , target: "female", value: heartDiseaseGender[0][1][1][1].length/(heartDiseaseGender[0][1][0][1].length+heartDiseaseGender[0][1][1][1].length)});
    const strokeHypertension = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.stroke, (d)=>d.hypertension);
    // console.log("stroke", strokeHypertension);
    links.push({
        source: "stroke",
        target: "hypertension",
        value: strokeHypertension[0][1][1][1].length
    });
    const strokeMarried = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.ever_married);
    // console.log("strokeMarried", strokeMarried);
    links.push({
        source: "stroke",
        target: "ever_married",
        value: strokeMarried[0][1][0][1].length
    });
    links.push({
        source: "stroke",
        target: "never_married",
        value: strokeMarried[0][1][1][1].length
    });
    const hypertensionGender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.hypertension, (d)=>d.gender);
    // console.log("heartDiseaseGender", heartDiseaseGender[0][1][1]);
    links.push({
        source: "hypertension",
        target: "male",
        value: hypertensionGender[0][1][0][1].length
    });
    links.push({
        source: "hypertension",
        target: "female",
        value: hypertensionGender[0][1][1][1].length
    });
    // links.push({source: "heartDisease" , target: "female", value: heartDiseaseGender[0][1][1][1].length/(heartDiseaseGender[0][1][0][1].length+heartDiseaseGender[0][1][1][1].length)});
    const hypertensionMarried = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$group$2e$js__$5b$client$5d$__$28$ecmascript$29$__["groups"])(rawData, (d)=>d.hypertension, (d)=>d.ever_married);
    // console.log("hypertensionMarried", hypertensionMarried);
    links.push({
        source: "hypertension",
        target: "ever_married",
        value: hypertensionMarried[0][1][0][1].length
    });
    links.push({
        source: "hypertension",
        target: "never_married",
        value: hypertensionMarried[0][1][1][1].length
    });
    return links;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/drag.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drag",
    ()=>drag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/d3/src/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$drag$2f$src$2f$drag$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__drag$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-drag/src/drag.js [client] (ecmascript) <export default as drag>");
;
function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$drag$2f$src$2f$drag$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__drag$3e$__["drag"]().on("start", dragstarted).on("drag", dragged).on("end", dragended);
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/graph.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Graph",
    ()=>Graph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/d3/src/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2f$src$2f$linear$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__scaleLinear$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-scale/src/linear.js [client] (ecmascript) <export default as scaleLinear>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$min$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__min$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-array/src/min.js [client] (ecmascript) <export default as min>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$max$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__max$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-array/src/max.js [client] (ecmascript) <export default as max>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2f$src$2f$ordinal$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__scaleOrdinal$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-scale/src/ordinal.js [client] (ecmascript) <export default as scaleOrdinal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2d$chromatic$2f$src$2f$categorical$2f$category10$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__schemeCategory10$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-scale-chromatic/src/categorical/category10.js [client] (ecmascript) <export default as schemeCategory10>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$simulation$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceSimulation$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-force/src/simulation.js [client] (ecmascript) <export default as forceSimulation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceLink$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-force/src/link.js [client] (ecmascript) <export default as forceLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$manyBody$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceManyBody$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-force/src/manyBody.js [client] (ecmascript) <export default as forceManyBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$center$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceCenter$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-force/src/center.js [client] (ecmascript) <export default as forceCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$y$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceY$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-force/src/y.js [client] (ecmascript) <export default as forceY>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$collide$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceCollide$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-force/src/collide.js [client] (ecmascript) <export default as forceCollide>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$selection$2f$src$2f$select$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__select$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-selection/src/select.js [client] (ecmascript) <export default as select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$selection$2f$src$2f$pointer$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pointer$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-selection/src/pointer.js [client] (ecmascript) <export default as pointer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getNodes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getNodes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getLinks$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getLinks.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$drag$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/drag.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function Graph(props) {
    _s();
    const { margin, svg_width, svg_height, data } = props;
    const nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getNodes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getNodes"])({
        rawData: data
    });
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getLinks$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLinks"])({
        rawData: data
    });
    const width = svg_width - margin.left - margin.right;
    const height = svg_height - margin.top - margin.bottom;
    const lineWidth = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2f$src$2f$linear$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__scaleLinear$3e$__["scaleLinear"]().range([
        2,
        6
    ]).domain([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$min$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__min$3e$__["min"](links, (d)=>d.value),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$max$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__max$3e$__["max"](links, (d)=>d.value)
    ]);
    const radius = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2f$src$2f$linear$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__scaleLinear$3e$__["scaleLinear"]().range([
        10,
        50
    ]).domain([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$min$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__min$3e$__["min"](nodes, (d)=>d.value),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$array$2f$src$2f$max$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__max$3e$__["max"](nodes, (d)=>d.value)
    ]);
    const color = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2f$src$2f$ordinal$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__scaleOrdinal$3e$__["scaleOrdinal"]().range(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$scale$2d$chromatic$2f$src$2f$categorical$2f$category10$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__schemeCategory10$3e$__["schemeCategory10"]).domain(nodes.map((d)=>d.name));
    const d3Selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Graph.useEffect": ()=>{
            const simulation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$simulation$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceSimulation$3e$__["forceSimulation"](nodes).force("link", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceLink$3e$__["forceLink"](links).id({
                "Graph.useEffect.simulation": (d)=>d.name
            }["Graph.useEffect.simulation"]).distance({
                "Graph.useEffect.simulation": (d)=>20 / d.value
            }["Graph.useEffect.simulation"])).force("charge", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$manyBody$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceManyBody$3e$__["forceManyBody"]()).force("center", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$center$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceCenter$3e$__["forceCenter"](width / 2, height / 2)).force("y", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$y$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceY$3e$__["forceY"]([
                height / 2
            ]).strength(0.02)).force("collide", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$force$2f$src$2f$collide$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__forceCollide$3e$__["forceCollide"]().radius({
                "Graph.useEffect.simulation": (d)=>radius(d.value) + 20
            }["Graph.useEffect.simulation"])).tick(3000);
            let g = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$selection$2f$src$2f$select$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__select$3e$__["select"](d3Selection.current);
            g.selectAll("*").remove();
            const link = g.append("g").attr("stroke", "#999").attr("stroke-opacity", 0.6).selectAll("line").data(links).join("line").attr("stroke-width", {
                "Graph.useEffect.link": (d)=>lineWidth(d.value)
            }["Graph.useEffect.link"]);
            const node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll("circle").data(nodes).enter();
            const point = node.append("circle").attr("r", {
                "Graph.useEffect.point": (d)=>radius(d.value)
            }["Graph.useEffect.point"]).attr("fill", {
                "Graph.useEffect.point": (d)=>color(d.name)
            }["Graph.useEffect.point"]).call((0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$drag$2e$js__$5b$client$5d$__$28$ecmascript$29$__["drag"])(simulation));
            const tooltip = g.append("g").style("display", "none").style("pointer-events", "none");
            const tooltipBox = tooltip.append("rect").attr("fill", "white").attr("stroke", "#999").attr("rx", 3).attr("ry", 3).attr("opacity", 0.95);
            const tooltipText = tooltip.append("text").attr("x", 6).attr("y", 15).style("font-size", "12px").style("fill", "#111");
            const showTooltip = {
                "Graph.useEffect.showTooltip": (event, d)=>{
                    tooltip.style("display", null);
                    tooltipText.text(d.name);
                    const textNode = tooltipText.node();
                    if (textNode) {
                        const bbox = textNode.getBBox();
                        tooltipBox.attr("width", bbox.width + 12).attr("height", bbox.height + 8);
                    }
                    moveTooltip(event);
                }
            }["Graph.useEffect.showTooltip"];
            const moveTooltip = {
                "Graph.useEffect.moveTooltip": (event)=>{
                    const [x, y] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$selection$2f$src$2f$pointer$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pointer$3e$__["pointer"](event, g.node());
                    tooltip.attr("transform", `translate(${x + 10}, ${y - 24})`);
                }
            }["Graph.useEffect.moveTooltip"];
            const hideTooltip = {
                "Graph.useEffect.hideTooltip": ()=>{
                    tooltip.style("display", "none");
                }
            }["Graph.useEffect.hideTooltip"];
            point.on("mouseover", showTooltip).on("mousemove", moveTooltip).on("mouseout", hideTooltip);
            const legendData = nodes.map({
                "Graph.useEffect.legendData": (d)=>d.name
            }["Graph.useEffect.legendData"]);
            const legend = g.append("g").attr("transform", "translate(10, 10)");
            legend.append("rect").attr("width", 120).attr("height", legendData.length * 20 + 16).attr("fill", "white").attr("stroke", "#ccc").attr("rx", 4);
            const legendRow = legend.selectAll(".legend-row").data(legendData).enter().append("g").attr("class", "legend-row").attr("transform", {
                "Graph.useEffect.legendRow": (_, i)=>`translate(10, ${18 + i * 20})`
            }["Graph.useEffect.legendRow"]);
            legendRow.append("circle").attr("r", 6).attr("fill", {
                "Graph.useEffect": (d)=>color(d)
            }["Graph.useEffect"]);
            legendRow.append("text").attr("x", 12).attr("y", 4).style("font-size", "12px").style("fill", "#222").text({
                "Graph.useEffect": (d)=>d
            }["Graph.useEffect"]);
            simulation.on("tick", {
                "Graph.useEffect": ()=>{
                    link.attr("x1", {
                        "Graph.useEffect": (d)=>d.source.x
                    }["Graph.useEffect"]).attr("y1", {
                        "Graph.useEffect": (d)=>d.source.y
                    }["Graph.useEffect"]).attr("x2", {
                        "Graph.useEffect": (d)=>d.target.x
                    }["Graph.useEffect"]).attr("y2", {
                        "Graph.useEffect": (d)=>d.target.y
                    }["Graph.useEffect"]);
                    point.attr("cx", {
                        "Graph.useEffect": (d)=>d.x
                    }["Graph.useEffect"]).attr("cy", {
                        "Graph.useEffect": (d)=>d.y
                    }["Graph.useEffect"]);
                }
            }["Graph.useEffect"]);
        }
    }["Graph.useEffect"], [
        width,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${svg_width} ${svg_height}`,
        preserveAspectRatio: "xMidYMid meet",
        style: {
            width: "100%",
            height: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            ref: d3Selection,
            transform: `translate(${margin.left}, ${margin.top})`
        }, void 0, false, {
            fileName: "[project]/components/graph.js",
            lineNumber: 149,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/graph.js",
        lineNumber: 144,
        columnNumber: 16
    }, this);
}
_s(Graph, "jAjZV44VK8HuslrS+q/icMwucAA=");
_c = Graph;
;
var _c;
__turbopack_context__.k.register(_c, "Graph");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/treemap.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TreeMap",
    ()=>TreeMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
// import React from "react";
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/d3/src/index.js [client] (ecmascript) <locals>");
;
;
function TreeMap(props) {
    const { margin, svg_width, svg_height, tree, selectedCell, setSelectedCell } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
}
_c = TreeMap;
var _c;
__turbopack_context__.k.register(_c, "TreeMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/getTree.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTree",
    ()=>getTree
]);
function getTree(data, attrs) {
    // console.log("data:", data);
    const getLevels = (attr)=>{
        const attrArray = data.map((d)=>d[attr]);
        // console.log("attrArray:", attrArray);
        const levels = attrArray.filter((d, idx)=>attrArray.indexOf(d) === idx).sort();
        return levels.map((d)=>{
            return {
                "name": d,
                "attr": attr
            };
        });
    };
    const levels = attrs.map((d)=>getLevels(d));
    // console.log("levels:", levels);
    const getJsonTree = function(data, levels) {
        let itemArr = [];
        if (levels.length === 0) {
            //itemArr.push(data);
            return null;
        }
        const currentLevel = levels[0];
        for(let i = 0; i < currentLevel.length; i++){
            let node = currentLevel[i];
            let newData = data.filter((d)=>d[currentLevel[0].attr] === currentLevel[i].name);
            if (newData.length > 0) {
                let newNode = {};
                newNode.points = newData;
                newNode.name = node.name;
                newNode.attr = node.attr;
                newNode.value = newData.length; //number of patients
                // newNode.value = newData.length/data.length; // portion of patients
                let children = getJsonTree(newData, levels.slice(1));
                if (children) {
                    newNode.children = children;
                }
                itemArr.push(newNode);
            }
        }
        return itemArr;
    };
    return getJsonTree(data, levels);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/assignment6.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/d3/src/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$fetch$2f$src$2f$dsv$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/d3-fetch/src/dsv.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Row.js [client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Col.js [client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Container$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Container.js [client] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Dropdown.js [client] (ecmascript) <export default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$graph$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/graph.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$treemap$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/treemap.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getTree$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getTree.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// The data is from the healthcare dataset.
const csvUrl = "https://gist.githubusercontent.com/hogwild/a716b6186d730c1d86962e9acaa1e59f/raw/aca017d18e2330668ef2765c5c049f89becda4ac/healthcare_stroke_data.csv";
function useData(csvPath) {
    _s();
    const [dataAll, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useData.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$fetch$2f$src$2f$dsv$2e$js__$5b$client$5d$__$28$ecmascript$29$__["csv"](csvPath).then({
                "useData.useEffect": (data)=>{
                    setData(data);
                }
            }["useData.useEffect"]);
        }
    }["useData.useEffect"], []);
    return dataAll;
}
_s(useData, "jFAO+gvWJAehsfxDbHQ5Znf5zSI=");
const App = ()=>{
    _s1();
    const [selectedDisease, setSelectedDisease] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("stroke");
    const [firstAttr, setFirstAttr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("stroke");
    const [secondAttr, setSecondAttr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("null");
    const [thirdAttr, setThirdAttr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("null");
    const [selectedCell, setSelectedCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null); //for highlighting the selected cell in the treemap
    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
    };
    const rawData = useData(csvUrl);
    if (!rawData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/pages/assignment6.js",
            lineNumber: 34,
            columnNumber: 16
        }, ("TURBOPACK compile-time value", void 0));
    }
    const attributes = [
        firstAttr,
        secondAttr,
        thirdAttr
    ].filter((d)=>d !== "null");
    const onFristAttrChange = (attr)=>{
        setFirstAttr(attr);
    };
    const onSecondAttrChange = (attr)=>{
        setSecondAttr(attr);
    };
    const onThirdAttrChange = (attr)=>{
        setThirdAttr(attr);
    };
    const onDiseaseChange = (disease)=>{
        setSelectedDisease(disease);
    };
    const data = rawData.filter((d)=>d[selectedDisease] === "1");
    // console.log("data:", data);
    const tree_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getTree$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTree"])(data, attributes);
    console.log("tree:", tree_);
    const tree = {
        "name": "root",
        "children": tree_
    };
    const options = [
        {
            value: "null",
            label: "None"
        },
        {
            value: "gender",
            label: "Gender"
        },
        {
            value: "stroke",
            label: "Stroke"
        },
        {
            value: "heart_disease",
            label: "Heart Disease"
        },
        {
            value: "hypertension",
            label: "Hypertension"
        },
        {
            value: "ever_married",
            label: "Ever Married"
        }
    ];
    const diseaseOptions = [
        {
            value: "stroke",
            label: "Stroke"
        },
        {
            value: "heart_disease",
            label: "Heart Disease"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Container$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: "Healthcare Data"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 62,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Context"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 63,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "In this assignment, we will use the ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://gist.github.com/hogwild/a716b6186d730c1d86962e9acaa1e59f",
                                    children: "healthcare dataset"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 64,
                                    columnNumber: 56
                                }, ("TURBOPACK compile-time value", void 0)),
                                ". The data contains information about patients with stroke and heart disease. We will visualize the relationships between different attributes in the data."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 64,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "The following attributes in the dataset are used in this assignment:"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 67,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "id: unique identifier"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 69,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: 'gender: "Male", "Female" or "Other"'
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 70,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "hypertension: 0 or 1"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 71,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "heart_disease: 0 or 1"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 72,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: 'ever_married: "Yes" or "No"'
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 73,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "stroke: 0 or 1"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 74,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 68,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/assignment6.js",
                    lineNumber: 61,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/pages/assignment6.js",
                lineNumber: 60,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Node-linked diagram"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 80,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "The node-linked diagram shows the relationships between different attributes in the data. The distance between two nodes shows the level of relation between them."
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 81,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/assignment6.js",
                    lineNumber: 79,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/pages/assignment6.js",
                lineNumber: 78,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 4,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "A dataset overview"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 86,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Each node represents an attribute in the dataset. For example, the ever_married is close to stroke but far from heartDisease, which means people who ever married are more likely to have stroke. Also, we can see the people who never married are less likely to have stroke but more likely to have heart disease."
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 87,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: 'The size of the node represents the number of patients with that attribute. The width of the link represents the number of patients with both attributes. For example, the link between "hypertension" and "heart_disease" represents the number of patients with both attributes.'
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 90,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/assignment6.js",
                        lineNumber: 85,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$graph$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Graph"], {
                            margin: margin,
                            svg_width: WIDTH,
                            svg_height: HEIGHT,
                            data: rawData
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 94,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/pages/assignment6.js",
                        lineNumber: 93,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/pages/assignment6.js",
                lineNumber: 84,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Treemap"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 99,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "The treemap visualizes hierarchical data using nested rectangles. It allows you to show proportions. For example, you can show the stroke occurrences across marriage or gender groups."
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 100,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/assignment6.js",
                    lineNumber: 98,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/pages/assignment6.js",
                lineNumber: 97,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 3,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Diseases"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 105,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Select the disease to visualize:"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 106,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-disease",
                                        children: diseaseOptions.find((option)=>option.value === selectedDisease)?.label || "Select a Disease"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 108,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: diseaseOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
                                                onClick: ()=>onDiseaseChange(option.value),
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/pages/assignment6.js",
                                                lineNumber: 113,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 111,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 107,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Attributes"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 119,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Select the attributes to visualize:"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 120,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-attr1",
                                        children: options.find((option)=>option.value === firstAttr)?.label || "Select First Attribute"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 122,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
                                                onClick: ()=>onFristAttrChange(option.value),
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/pages/assignment6.js",
                                                lineNumber: 127,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 125,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 121,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-attr2",
                                        children: options.find((option)=>option.value === secondAttr)?.label || "Select Second Attribute"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 134,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
                                                onClick: ()=>onSecondAttrChange(option.value),
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/pages/assignment6.js",
                                                lineNumber: 139,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 137,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 133,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-attr3",
                                        children: options.find((option)=>option.value === thirdAttr)?.label || "Select Third Attribute"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 146,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
                                                onClick: ()=>onThirdAttrChange(option.value),
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/pages/assignment6.js",
                                                lineNumber: 151,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 149,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 145,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/assignment6.js",
                        lineNumber: 104,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 7,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: `Why people get ${selectedDisease}? - A treemap explanation`
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 159,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$treemap$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TreeMap"], {
                                margin: margin,
                                svg_width: WIDTH,
                                svg_height: HEIGHT,
                                tree: tree,
                                selectedCell: selectedCell,
                                setSelectedCell: setSelectedCell
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 160,
                                columnNumber: 16
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/assignment6.js",
                        lineNumber: 158,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/pages/assignment6.js",
                lineNumber: 103,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "References"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 165,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "The data is from the healthcare dataset. The dataset is available at:",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset",
                                    children: " Stroke Prediction Dataset"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 167,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 166,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/assignment6.js",
                    lineNumber: 164,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/pages/assignment6.js",
                lineNumber: 163,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/pages/assignment6.js",
        lineNumber: 59,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(App, "nozSCdMKCaJ3VogoOOeeHLCmLgg=", false, function() {
    return [
        useData
    ];
});
_c = App;
const __TURBOPACK__default__export__ = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/assignment6.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/assignment6";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/assignment6.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/assignment6\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/assignment6.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0f-ie9f._.js.map