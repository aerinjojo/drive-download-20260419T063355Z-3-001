module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/utils/getNodes.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getNodes",
    ()=>getNodes
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__ = __turbopack_context__.i("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function getNodes({ rawData }) {
    const nodes = [];
    const heartDisease = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.heart_disease);
    // console.log("heartDisease", heartDisease);
    // nodes.push({name: "no_heartDisease", value: heartDisease[0][1].length/rawData.length});
    nodes.push({
        name: "heartDisease",
        value: heartDisease[0][1].length
    });
    const married = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.ever_married);
    // console.log("married", married);
    nodes.push({
        name: "ever_married",
        value: married[0][1].length
    });
    nodes.push({
        name: "never_married",
        value: married[1][1].length
    });
    const hypertension = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.hypertension);
    // console.log("hypertension", hypertension);
    // nodes.push({name: "no_hypertension", value: hypertension[0][1].length/rawData.length});
    nodes.push({
        name: "hypertension",
        value: hypertension[1][1].length
    });
    const gender = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.gender);
    // console.log("gender", gender);
    nodes.push({
        name: "male",
        value: gender[0][1].length
    });
    nodes.push({
        name: "female",
        value: gender[1][1].length
    });
    const stroke = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.stroke);
    // console.log("stroke", stroke);
    nodes.push({
        name: "stroke",
        value: stroke[0][1].length
    });
    // nodes.push({name:"no_stroke", value: stroke[1][1].length/rawData.length});
    // nodes.push({name:"otherGender", value: gender[2][1].length})    
    return nodes;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/utils/getLinks.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getLinks",
    ()=>getLinks
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__ = __turbopack_context__.i("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function getLinks({ rawData }) {
    const links = [];
    const genderHeartDisease = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.gender, (d)=>d.heart_disease);
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
    const heartDiseaseStroke = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.stroke);
    // console.log("heartDiseaseStroke", heartDiseaseStroke);
    links.push({
        source: "heartDisease",
        target: "stroke",
        value: heartDiseaseStroke[0][1][0][1].length
    });
    // links.push({source: "heartDisease" , target: "female", value: heartDiseaseGender[0][1][1][1].length/(heartDiseaseGender[0][1][0][1].length+heartDiseaseGender[0][1][1][1].length)});
    const heartDiseaseHypertension = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.hypertension);
    // console.log("heartDiseaseHypertension", heartDiseaseHypertension);
    links.push({
        source: "heartDisease",
        target: "hypertension",
        value: heartDiseaseHypertension[0][1][1][1].length
    });
    const heartDiseaseMarried = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.ever_married);
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
    const strokeGender = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.stroke_disease, (d)=>d.gender);
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
    const strokeHypertension = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.stroke, (d)=>d.hypertension);
    // console.log("stroke", strokeHypertension);
    links.push({
        source: "stroke",
        target: "hypertension",
        value: strokeHypertension[0][1][1][1].length
    });
    const strokeMarried = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.heart_disease, (d)=>d.ever_married);
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
    const hypertensionGender = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.hypertension, (d)=>d.gender);
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
    const hypertensionMarried = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["groups"])(rawData, (d)=>d.hypertension, (d)=>d.ever_married);
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/utils/drag.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "drag",
    ()=>drag
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__ = __turbopack_context__.i("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
    return __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["drag"]().on("start", dragstarted).on("drag", dragged).on("end", dragended);
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/graph.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Graph",
    ()=>Graph
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__ = __turbopack_context__.i("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getNodes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getNodes.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getLinks$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getLinks.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$drag$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/drag.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getNodes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getLinks$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$drag$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getNodes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getLinks$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$drag$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function Graph(props) {
    const { margin, svg_width, svg_height, data } = props;
    const nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getNodes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getNodes"])({
        rawData: data
    });
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getLinks$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getLinks"])({
        rawData: data
    });
    const width = svg_width - margin.left - margin.right;
    const height = svg_height - margin.top - margin.bottom;
    const lineWidth = __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["scaleLinear"]().range([
        2,
        6
    ]).domain([
        __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["min"](links, (d)=>d.value),
        __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["max"](links, (d)=>d.value)
    ]);
    const radius = __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["scaleLinear"]().range([
        10,
        50
    ]).domain([
        __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["min"](nodes, (d)=>d.value),
        __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["max"](nodes, (d)=>d.value)
    ]);
    const color = __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["scaleOrdinal"]().range(__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["schemeCategory10"]).domain(nodes.map((d)=>d.name));
    const d3Selection = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const simulation = __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["forceSimulation"](nodes).force("link", __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["forceLink"](links).id((d)=>d.name).distance((d)=>20 / d.value)).force("charge", __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["forceManyBody"]()).force("center", __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["forceCenter"](width / 2, height / 2)).force("y", __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["forceY"]([
            height / 2
        ]).strength(0.02)).force("collide", __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["forceCollide"]().radius((d)=>radius(d.value) + 20)).tick(3000);
        let g = __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["select"](d3Selection.current);
        g.selectAll("*").remove();
        const link = g.append("g").attr("stroke", "#999").attr("stroke-opacity", 0.6).selectAll("line").data(links).join("line").attr("stroke-width", (d)=>lineWidth(d.value));
        const node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll("circle").data(nodes).enter();
        const point = node.append("circle").attr("r", (d)=>radius(d.value)).attr("fill", (d)=>color(d.name)).call((0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$drag$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["drag"])(simulation));
        const tooltip = g.append("g").style("display", "none").style("pointer-events", "none");
        const tooltipBox = tooltip.append("rect").attr("fill", "white").attr("stroke", "#999").attr("rx", 3).attr("ry", 3).attr("opacity", 0.95);
        const tooltipText = tooltip.append("text").attr("x", 6).attr("y", 15).style("font-size", "12px").style("fill", "#111");
        const showTooltip = (event, d)=>{
            tooltip.style("display", null);
            tooltipText.text(d.name);
            const textNode = tooltipText.node();
            if (textNode) {
                const bbox = textNode.getBBox();
                tooltipBox.attr("width", bbox.width + 12).attr("height", bbox.height + 8);
            }
            moveTooltip(event);
        };
        const moveTooltip = (event)=>{
            const [x, y] = __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["pointer"](event, g.node());
            tooltip.attr("transform", `translate(${x + 10}, ${y - 24})`);
        };
        const hideTooltip = ()=>{
            tooltip.style("display", "none");
        };
        point.on("mouseover", showTooltip).on("mousemove", moveTooltip).on("mouseout", hideTooltip);
        const legendData = nodes.map((d)=>d.name);
        const legend = g.append("g").attr("transform", "translate(10, 10)");
        legend.append("rect").attr("width", 120).attr("height", legendData.length * 20 + 16).attr("fill", "white").attr("stroke", "#ccc").attr("rx", 4);
        const legendRow = legend.selectAll(".legend-row").data(legendData).enter().append("g").attr("class", "legend-row").attr("transform", (_, i)=>`translate(10, ${18 + i * 20})`);
        legendRow.append("circle").attr("r", 6).attr("fill", (d)=>color(d));
        legendRow.append("text").attr("x", 12).attr("y", 4).style("font-size", "12px").style("fill", "#222").text((d)=>d);
        simulation.on("tick", ()=>{
            link.attr("x1", (d)=>d.source.x).attr("y1", (d)=>d.source.y).attr("x2", (d)=>d.target.x).attr("y2", (d)=>d.target.y);
            point.attr("cx", (d)=>d.x).attr("cy", (d)=>d.y);
        });
    }, [
        width,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${svg_width} ${svg_height}`,
        preserveAspectRatio: "xMidYMid meet",
        style: {
            width: "100%",
            height: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("g", {
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
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/treemap.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TreeMap",
    ()=>TreeMap
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
// import React from "react";
var __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__ = __turbopack_context__.i("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function TreeMap(props) {
    const { margin, svg_width, svg_height, tree, selectedCell, setSelectedCell } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {}, void 0, false);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/utils/getTree.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/pages/assignment6.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__ = __turbopack_context__.i("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Row.js [ssr] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Col.js [ssr] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Container$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Container.js [ssr] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__ = __turbopack_context__.i("[project]/node_modules/react-bootstrap/esm/Dropdown.js [ssr] (ecmascript) <export default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$graph$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/graph.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$treemap$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/treemap.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getTree$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getTree.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$graph$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$treemap$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$graph$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$treemap$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
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
    const [dataAll, setData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$externals$5d2f$d3__$5b$external$5d$__$28$d3$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$d3$29$__["csv"](csvPath).then((data)=>{
            setData(data);
        });
    }, []);
    return dataAll;
}
const App = ()=>{
    const [selectedDisease, setSelectedDisease] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("stroke");
    const [firstAttr, setFirstAttr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("stroke");
    const [secondAttr, setSecondAttr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("null");
    const [thirdAttr, setThirdAttr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("null");
    const [selectedCell, setSelectedCell] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null); //for highlighting the selected cell in the treemap
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
    const tree_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getTree$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getTree"])(data, attributes);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Container$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            children: "Healthcare Data"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 62,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "Context"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 63,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "In this assignment, we will use the ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: "The following attributes in the dataset are used in this assignment:"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 67,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "id: unique identifier"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 69,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: 'gender: "Male", "Female" or "Other"'
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 70,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "hypertension: 0 or 1"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 71,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "heart_disease: 0 or 1"
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 72,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: 'ever_married: "Yes" or "No"'
                                }, void 0, false, {
                                    fileName: "[project]/pages/assignment6.js",
                                    lineNumber: 73,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "Node-linked diagram"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 80,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 4,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                children: "A dataset overview"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 86,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "Each node represents an attribute in the dataset. For example, the ever_married is close to stroke but far from heartDisease, which means people who ever married are more likely to have stroke. Also, we can see the people who never married are less likely to have stroke but more likely to have heart disease."
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 87,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$graph$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Graph"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "Treemap"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 99,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 3,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                children: "Diseases"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 105,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "Select the disease to visualize:"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 106,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-disease",
                                        children: diseaseOptions.find((option)=>option.value === selectedDisease)?.label || "Select a Disease"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 108,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: diseaseOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                children: "Attributes"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 119,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "Select the attributes to visualize:"
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 120,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-attr1",
                                        children: options.find((option)=>option.value === firstAttr)?.label || "Select First Attribute"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 122,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-attr2",
                                        children: options.find((option)=>option.value === secondAttr)?.label || "Select Second Attribute"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 134,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Toggle, {
                                        id: "dropdown-attr3",
                                        children: options.find((option)=>option.value === thirdAttr)?.label || "Select Third Attribute"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/assignment6.js",
                                        lineNumber: 146,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Menu, {
                                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Dropdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"].Item, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        lg: 7,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                children: `Why people get ${selectedDisease}? - A treemap explanation`
                            }, void 0, false, {
                                fileName: "[project]/pages/assignment6.js",
                                lineNumber: 159,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$treemap$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["TreeMap"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                className: "justify-content-md-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    lg: 10,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "References"
                        }, void 0, false, {
                            fileName: "[project]/pages/assignment6.js",
                            lineNumber: 165,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: [
                                "The data is from the healthcare dataset. The dataset is available at:",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
const __TURBOPACK__default__export__ = App;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12tl3hc._.js.map