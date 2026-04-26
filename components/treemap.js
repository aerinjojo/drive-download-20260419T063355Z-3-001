import { useMemo } from "react";

import { treemap, hierarchy, scaleOrdinal, schemeDark2, format } from "d3";


function Text({ node, width, height }) {
    const label = node.data.attr ? `${node.data.attr}: ${node.data.name}` : node.data.name;
    const countLabel = `count: ${format(",")(node.value || 0)}`;
    const showDetail = width > 90 && height > 36;

    return (
        <text
            x={6}
            y={14}
            pointerEvents="none"
            style={{ fill: "white", fontSize: "11px" }}
        >
            <tspan x={6} dy={0}>{label}</tspan>
            {showDetail ? <tspan x={6} dy={14}>{countLabel}</tspan> : null}
        </text>
    );
}


export function TreeMap(props) {
    const { margin, svg_width, svg_height, tree, selectedCell, setSelectedCell } = props;

    const innerWidth = svg_width - margin.left - margin.right;
    const innerHeight = svg_height - margin.top - margin.bottom;

    const root = useMemo(() => {
        if (!tree) {
            return null;
        }

        const layoutRoot = hierarchy(tree)
            .sum(d => d.value || 0)
            .sort((a, b) => b.value - a.value);

        treemap()
            .size([innerWidth, innerHeight])
            .paddingInner(2)
            .round(true)(layoutRoot);

        return layoutRoot;
    }, [tree, innerWidth, innerHeight]);

    const nodes = root ? root.descendants().filter(d => d.depth > 0) : [];
    const color = useMemo(() => {
        return scaleOrdinal(schemeDark2).domain(nodes.map(d => `${d.depth}-${d.data.attr || "root"}-${d.data.name}`));
    }, [nodes]);

    const getNodeKey = (node) => `${node.depth}-${node.data.attr || "root"}-${node.data.name}`;

    if (!root) {
        return null;
    }

    return (
        <svg
            viewBox={`0 0 ${svg_width} ${svg_height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%" }}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {nodes.map(node => {
                    const key = getNodeKey(node);
                    const isSelected = selectedCell?.key === key;
                    const width = node.x1 - node.x0;
                    const height = node.y1 - node.y0;

                    return (
                        <g
                            key={key}
                            transform={`translate(${node.x0}, ${node.y0})`}
                            onClick={() => setSelectedCell({ key, name: node.data.name, attr: node.data.attr })}
                            style={{ cursor: "pointer" }}
                        >
                            <rect
                                width={width}
                                height={height}
                                fill={color(key)}
                                stroke={isSelected ? "#111" : "#fff"}
                                strokeWidth={isSelected ? 3 : 1}
                            />
                            {width > 18 && height > 18 ? <Text node={node} width={width} height={height} /> : null}
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}

  