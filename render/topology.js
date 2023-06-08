export class Vertex {
    p; // pos
    n; // normal
    c; // color

    constructor( newP, newN, newC ) {
        this.p = newP;
        this.n = newN;
        this.c = newC;
    }
}
export class Topology {
    vertexesA;
    indexesA;

    constructor( newVs, newIndexesA, newIsVertexesA = 0 ) {
        this.vertexesA = newVs;
        this.indexesA = newIndexesA;
        this.isVertexesA = newIsVertexesA;
    }

    getPosArray() {
        var outPosA;

        for (var i = 0; i < this.Vertexes.length; i++)
            outPosA[i] = vertexesA[i].p;
        return outPosA;
    }

    getNormalArray() {
        var outNA;

        for (var i = 0; i < this.Vertexes.length; i++)
            outNA[i] = vertexesA[i].n;
        return outNA;
    };

    getColorArray() {
        var outColorA;

        for (var i = 0; i < this.Vertexes.length; i++)
            outColorA[i] = vertexesA[i].c;
        return outColorA;
    };

    static setByPosArrayAndColor( posA, newIndexesA, color ) {
        var newT = new Topology([], []);

        for (var i = 0; i < posA.length / 4; i++)
            newT.vertexesA[i] = new Vertex([posA[i * 4], posA[i * 4 + 1], posA[i * 4 + 2], posA[i * 4 + 3]], [1, 0, 0, 1], color);
        newT.indexesA = newIndexesA;
        return newT;
    }

    static createTetraedr() {
        var
            l1 = (3 / 2) / Math.sqrt(2) * 0.5,
            l2 = l1 * Math.sqrt(3) / 2;

        var p = [
            [0,         0,   0.5, 1],
            [0,        l1, -0.25, 1],
            [l2,  -l1 / 2, -0.25, 1],
            [-l2, -l1 / 2, -0.25, 1]
        ];

        var v = [];

        for (var i = 0; i < p.length; i++)
            v[i] = p[i].concat(p[i]).concat([1, 0, 0, 1]);

        var inds = [0, 1, 2,
                    0, 2, 3,
                    0, 3, 1,
                    1, 2, 3];

        return new Topology(v, inds, 1);
        //return Topology.setByPosArrayAndColor(p, inds, [1, 0, 1, 1]);
    }

    static createCube() {
        var a = 0.5 / Math.sqrt(3);

        var p = [
            [-a, -a, -a, 1],
            [-a,  a, -a, 1],
            [a,   a, -a, 1],
            [a,  -a, -a, 1],
            [-a, -a,  a, 1],
            [-a,  a,  a, 1],
            [a,   a,  a, 1],
            [a,  -a,  a, 1],
        ];

        var v = [];

        for (var i = 0; i < p.length; i++)
            v[i] = p[i].concat(p[i]).concat([1, 0, 0, 1]);

        var inds = [0, 1, 2, // Bottom Face
                    0, 2, 3,
                    4, 5, 6, // Top face
                    4, 6, 7,
                    0, 4, 5, // Left
                    5, 1, 0,
                    1, 5, 6, // Front 
                    6, 2, 1,
                    2, 6, 7, // Right
                    7, 3, 2,
                    3, 7, 4, // Back
                    4, 0, 3,];

        return new Topology(v, inds, 1);
        //return Topology.setByPosArrayAndColor(p, inds, [1, 0, 1, 1]);

        //var scale = 1;
        //return Topology.setByPosArrayAndColor([-scale, -scale, 0, 1,
        //                                        scale, -scale, 0, 1,
        //                                        scale, scale, 0, 1,
        //                                       -scale, -scale, 0, 1,
        //                                       -scale, scale, 0, 1,
        //                                        scale, scale, 0, 1], [0, 1, 2, 5, 3, 4], [1, 0, 1, 1]);
    }
    
    getVertexArray() {
        if (this.isVertexesA)
        {
            var outV = new Float32Array(this.vertexesA.length * 12);

            for (var i = 0; i < this.vertexesA.length * 12; i++)
                outV[i] = this.vertexesA[Math.floor(i / 12)][i % 12];
            
            return  outV;
        }

        var outV = [];
        this.vertexesA.forEach((elem) => {
            outV = outV.concat(elem.p.concat(elem.n).concat(elem.c));
        });
        return new Float32Array(outV);
    }
}