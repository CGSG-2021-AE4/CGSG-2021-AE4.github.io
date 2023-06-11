import { Topology } from "./topology.js";
import { matr } from "../math.js";

export class Lighting { 
    dirShader;
    dirPrim;

    constructor() {

    }

    async init( rnd ) {
        let rectTop = Topology.createScreenRect();

        this.dirShader = await rnd.createShader('lights/dir');
        this.dirPrim = await rnd.createPrim(this.dirShader, rectTop);
    }

    draw( rnd, camera, target ) {
        this.dirShader.use(rnd);
        target.bindSamplers(rnd, this.dirShader);

        this.dirPrim.draw(rnd, camera, new matr());
        
        target.unbindSamplers(rnd);
        
    }

}