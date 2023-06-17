// Vec3

class vec3 {

    x = 0;
    y = 0;
    z = 0;

    constructor ( newX = 0, newY = 0, newZ = 0 ) {
        this.x = newX;
        this.y = newY;
        this.z = newZ;
    }

    add( other ) {
        return new vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    scalarMul(other) {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    cross( other ) {
      return new vec3(this.y * other.z - this.z * other.y, other.x * this.z - this.x * other.z, this.x * other.y - other.x * this.y);
    }

    mul( other ) {
      return new vec3(this.x * other.x, this.y * other.y, this.z * other.y);
    }
    mulNum( n ) {
      return new vec3(this.x * n, this.y * n, this.z * n);
    }

    sub( other ) {
      return new vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    normalise() {
      return this.mulNum(1 / this.length());
    }

    mulMatr( m )
    {
      var w = this.x * m.M[0 * 4 + 3] + this.y * m.M[1 * 4 + 3] + this.z * m.M[2 * 4 + 3] + m.M[3 * 4 + 3];

      return new vec3((this.x * m.M[0 * 4 + 0] + this.y * m.M[1 * 4 + 0] + this.z * m.M[2 * 4 + 0] + m.M[3 * 4 + 0]) / w,
                      (this.x * m.M[0 * 4 + 1] + this.y * m.M[1 * 4 + 1] + this.z * m.M[2 * 4 + 1] + m.M[3 * 4 + 1]) / w,
                      (this.x * m.M[0 * 4 + 2] + this.y * m.M[1 * 4 + 2] + this.z * m.M[2 * 4 + 2] + m.M[3 * 4 + 2]) / w);
    }

    toFltA() {
      return [this.x, this.y, this.z];
    }
    
}

// Matrs
class matr {
    M;
  
    inverse() {
      var det = this.length();
      var r = new matr();
    
      if (det == 0)
        return matr();
  
      /* build adjoint matrix */
      r.M[0 * 4 + 0] =
        this.determ3x3(this.M[1 * 4 + 1], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                       this.M[2 * 4 + 1], this.M[2 * 4 + 2], this.M[2 * 4 + 3],
                       this.M[3 * 4 + 1], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) / det;
      r.M[1 * 4 + 0] =
        -this.determ3x3(this.M[1 * 4 + 0], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                        this.M[2 * 4 + 0], this.M[2 * 4 + 2], this.M[2 * 4 + 3],
                        this.M[3 * 4 + 0], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) / det;
      r.M[2 * 4 + 0] =
        this.determ3x3(this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 3],
                  this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 3],
                  this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 3]) / det;
      r.M[3 * 4 + 0] =
        -this.determ3x3(this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 2],
                   this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 2],
                   this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 2]) / det;
     
      r.M[0 * 4 + 1] =
        -this.determ3x3(this.M[0 * 4 + 1], this.M[0 * 4 + 2], this.M[0 * 4 + 3],
                   this.M[2 * 4 + 1], this.M[2 * 4 + 2], this.M[2 * 4 + 3],
                   this.M[3 * 4 + 1], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) / det;
      r.M[1 * 4 + 1] =
        this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 2], this.M[0 * 4 + 3],
                  this.M[2 * 4 + 0], this.M[2 * 4 + 2], this.M[2 * 4 + 3],
                  this.M[3 * 4 + 0], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) / det;
      r.M[2 * 4 + 1] =
        -this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 1], this.M[0 * 4 + 3],
                   this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 3],
                   this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 3]) / det;
      r.M[3 * 4 + 1] =
        this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 1], this.M[0 * 4 + 2],
                  this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 2],
                  this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 2]) / det;
     
      r.M[0 * 4 + 2] =
        this.determ3x3(this.M[0 * 4 + 1], this.M[0 * 4 + 2], this.M[0 * 4 + 3],
                  this.M[1 * 4 + 1], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                  this.M[3 * 4 + 1], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) / det;
      r.M[1 * 4 + 2] =
        -this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 2], this.M[0 * 4 + 3],
                   this.M[1 * 4 + 0], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                   this.M[3 * 4 + 0], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) / det;
      r.M[2 * 4 + 2] =
        this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 1], this.M[0 * 4 + 3],
                  this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 3],
                  this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 3]) / det;
      r.M[3 * 4 + 2] =
        -this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 1], this.M[0 * 4 + 2],
                   this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 2],
                   this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 2]) / det;
     
      r.M[0 * 4 + 3] =
        -this.determ3x3(this.M[0 * 4 + 1], this.M[0 * 4 + 2], this.M[0 * 4 + 3],
                   this.M[1 * 4 + 1], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                   this.M[2 * 4 + 1], this.M[2 * 4 + 2], this.M[2 * 4 + 3]) / det;
      r.M[1 * 4 + 3] =
        this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 2], this.M[0 * 4 + 3],
                  this.M[1 * 4 + 0], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                  this.M[2 * 4 + 0], this.M[2 * 4 + 2], this.M[2 * 4 + 3]) / det;
      r.M[2 * 4 + 3] =
        -this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 1], this.M[0 * 4 + 3],
                   this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 3],
                   this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 3]) / det;
      r.M[3 * 4 + 3] =
        this.determ3x3(this.M[0 * 4 + 0], this.M[0 * 4 + 1], this.M[0 * 4 + 2],
                  this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 2],
                  this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 2]) / det;
      return r;
    }
  
    constructor( A00, A01, A02, A03,
                 A10, A11, A12, A13,
                 A20, A21, A22, A23,
                 A30, A31, A32, A33 ) {
      this.M = [A00, A01, A02, A03, 
           A10, A11, A12, A13, 
           A20, A21, A22, A23,
           A30, A31, A32, A33];
    }
  
    static scale( s ) {
      return new matr(s.x, 0, 0, 0,
                      0, s.y, 0, 0,
                      0, 0, s.z, 0,
                      0, 0, 0, 1);
    }
    
    static identity() {
      return new matr();
    }
  
    static translate( t ) {
      return new matr(1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      t.x, t.y, t.z, 1);
    }
      
    static rotateX( A )
    {
      var si = Math.sin(A), co = Math.cos(A);
  
      return new matr(1, 0, 0, 0,
                      0, co, si, 0,
                      0, -si, co, 0,
                      0, 0, 0, 1);
    }
  
    static rotateY( A )
    {
      var si = Math.sin(A), co = Math.cos(A);
   
      return  new matr(co, 0, -si, 0,
                      0, 1, 0, 0,
                      si, 0, co, 0,
                      0, 0, 0, 1);
    }
  
    static rotateZ( A )
    {
      var si = Math.sin(A), co = Math.cos(A);
      return new matr(co, si, 0, 0,
                     -si, co, 0, 0,
                      0, 0, 1, 0,
                      0, 0, 0, 1);
    }
  
    static rotate( A, V )
    {
      var si = Math.sin(A), co = Math.cos(A);
      var V1 = V.normalise();
    
      return new  matr(co + V1.x * V1.x * (1 - co), V1.y * V1.x * (1 - co) + V1.z * si, V1.z * V1.x * (1 - co) - V1.y * si, 0,
                      V1.y * V1.x * (1 - co) - V1.z * si, co + V1.y * V1.y * (1 - co), V1.y * V1.z * (1 - co) + V1.x * si, 0,
                      V1.z * V1.x * (1 - co) + V1.y * si, V1.z * V1.y * (1 - co) - V1.x * si, co + V1.z * V1.z * (1 - co), 0,
                      0, 0, 0, 1); 
    }
  
    transpose() {
      return new matr(this.M[0 * 4 + 0], this.M[1 * 4 + 0], this.M[2 * 4 + 0], this.M[3 * 4 + 0],
                      this.M[0 * 4 + 1], this.M[1 * 4 + 1], this.M[2 * 4 + 1], this.M[3 * 4 + 1],
                      this.M[0 * 4 + 2], this.M[1 * 4 + 2], this.M[2 * 4 + 2], this.M[3 * 4 + 2],
                      this.M[0 * 4 + 3], this.M[1 * 4 + 3], this.M[2 * 4 + 3], this.M[3 * 4 + 3]);
    }
  
    determ3x3(A11, A12, A13,
              A21, A22, A23,
              A31, A32, A33) {
      return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 -
             A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
    }
  
    length() {
      return this.M[0 * 4 + 0] * this.determ3x3(this.M[1 * 4 + 1], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
									                         this.M[2 * 4 + 1], this.M[2 * 4 + 2], this.M[2 * 4 + 3],
									                         this.M[3 * 4 + 1], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) +
            -this.M[0 * 4 + 1] * this.determ3x3(this.M[1 * 4 + 0], this.M[1 * 4 + 2], this.M[1 * 4 + 3],
                                           this.M[2 * 4 + 0], this.M[2 * 4 + 2], this.M[2 * 4 + 3],
                                           this.M[3 * 4 + 0], this.M[3 * 4 + 2], this.M[3 * 4 + 3]) +
            +this.M[0 * 4 + 2] * this.determ3x3(this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 3],
                                           this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 3],
                                           this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 3]) +
            -this.M[0 * 4 + 3] * this.determ3x3(this.M[1 * 4 + 0], this.M[1 * 4 + 1], this.M[1 * 4 + 2],
                                           this.M[2 * 4 + 0], this.M[2 * 4 + 1], this.M[2 * 4 + 2],
                                           this.M[3 * 4 + 0], this.M[3 * 4 + 1], this.M[3 * 4 + 2]);
    }
  
    mul( M2 )
    {
      var res = new matr();
    
      res.M[0 * 4 + 0] = this.M[0 * 4 + 0] * M2.M[0 * 4 + 0] + this.M[0 * 4 + 1] * M2.M[1 * 4 + 0] + 
                    this.M[0 * 4 + 2] * M2.M[2 * 4 + 0] + this.M[0 * 4 + 3] * M2.M[3 * 4 + 0];
      res.M[0 * 4 + 1] = this.M[0 * 4 + 0] * M2.M[0 * 4 + 1] + this.M[0 * 4 + 1] * M2.M[1 * 4 + 1] + 
                    this.M[0 * 4 + 2] * M2.M[2 * 4 + 1] + this.M[0 * 4 + 3] * M2.M[3 * 4 + 1];
      res.M[0 * 4 + 2] = this.M[0 * 4 + 0] * M2.M[0 * 4 + 2] + this.M[0 * 4 + 1] * M2.M[1 * 4 + 2] + 
                    this.M[0 * 4 + 2] * M2.M[2 * 4 + 2] + this.M[0 * 4 + 3] * M2.M[3 * 4 + 2];
      res.M[0 * 4 + 3] = this.M[0 * 4 + 0] * M2.M[0 * 4 + 3] + this.M[0 * 4 + 1] * M2.M[1 * 4 + 3] + 
                    this.M[0 * 4 + 2] * M2.M[2 * 4 + 3] + this.M[0 * 4 + 3] * M2.M[3 * 4 + 3];
					
      res.M[1 * 4 + 0] = this.M[1 * 4 + 0] * M2.M[0 * 4 + 0] + this.M[1 * 4 + 1] * M2.M[1 * 4 + 0] + 
                    this.M[1 * 4 + 2] * M2.M[2 * 4 + 0] + this.M[1 * 4 + 3] * M2.M[3 * 4 + 0];
      res.M[1 * 4 + 1] = this.M[1 * 4 + 0] * M2.M[0 * 4 + 1] + this.M[1 * 4 + 1] * M2.M[1 * 4 + 1] + 
                    this.M[1 * 4 + 2] * M2.M[2 * 4 + 1] + this.M[1 * 4 + 3] * M2.M[3 * 4 + 1];
      res.M[1 * 4 + 2] = this.M[1 * 4 + 0] * M2.M[0 * 4 + 2] + this.M[1 * 4 + 1] * M2.M[1 * 4 + 2] + 
                    this.M[1 * 4 + 2] * M2.M[2 * 4 + 2] + this.M[1 * 4 + 3] * M2.M[3 * 4 + 2];
      res.M[1 * 4 + 3] = this.M[1 * 4 + 0] * M2.M[0 * 4 + 3] + this.M[1 * 4 + 1] * M2.M[1 * 4 + 3] + 
                    this.M[1 * 4 + 2] * M2.M[2 * 4 + 3] + this.M[1 * 4 + 3] * M2.M[3 * 4 + 3];
					
      res.M[2 * 4 + 0] = this.M[2 * 4 + 0] * M2.M[0 * 4 + 0] + this.M[2 * 4 + 1] * M2.M[1 * 4 + 0] + 
                    this.M[2 * 4 + 2] * M2.M[2 * 4 + 0] + this.M[2 * 4 + 3] * M2.M[3 * 4 + 0];
      res.M[2 * 4 + 1] = this.M[2 * 4 + 0] * M2.M[0 * 4 + 1] + this.M[2 * 4 + 1] * M2.M[1 * 4 + 1] + 
                    this.M[2 * 4 + 2] * M2.M[2 * 4 + 1] + this.M[2 * 4 + 3] * M2.M[3 * 4 + 1];
      res.M[2 * 4 + 2] = this.M[2 * 4 + 0] * M2.M[0 * 4 + 2] + this.M[2 * 4 + 1] * M2.M[1 * 4 + 2] + 
                    this.M[2 * 4 + 2] * M2.M[2 * 4 + 2] + this.M[2 * 4 + 3] * M2.M[3 * 4 + 2];
      res.M[2 * 4 + 3] = this.M[2 * 4 + 0] * M2.M[0 * 4 + 3] + this.M[2 * 4 + 1] * M2.M[1 * 4 + 3] + 
                    this.M[2 * 4 + 2] * M2.M[2 * 4 + 3] + this.M[2 * 4 + 3] * M2.M[3 * 4 + 3];
					
      res.M[3 * 4 + 0] = this.M[3 * 4 + 0] * M2.M[0 * 4 + 0] + this.M[3 * 4 + 1] * M2.M[1 * 4 + 0] + 
                    this.M[3 * 4 + 2] * M2.M[2 * 4 + 0] + this.M[3 * 4 + 3] * M2.M[3 * 4 + 0];
      res.M[3 * 4 + 1] = this.M[3 * 4 + 0] * M2.M[0 * 4 + 1] + this.M[3 * 4 + 1] * M2.M[1 * 4 + 1] + 
                    this.M[3 * 4 + 2] * M2.M[2 * 4 + 1] + this.M[3 * 4 + 3] * M2.M[3 * 4 + 1];
      res.M[3 * 4 + 2] = this.M[3 * 4 + 0] * M2.M[0 * 4 + 2] + this.M[3 * 4 + 1] * M2.M[1 * 4 + 2] + 
                    this.M[3 * 4 + 2] * M2.M[2 * 4 + 2] + this.M[3 * 4 + 3] * M2.M[3 * 4 + 2];
      res.M[3 * 4 + 3] = this.M[3 * 4 + 0] * M2.M[0 * 4 + 3] + this.M[3 * 4 + 1] * M2.M[1 * 4 + 3] + 
                    this.M[3 * 4 + 2] * M2.M[2 * 4 + 3] + this.M[3 * 4 + 3] * M2.M[3 * 4 + 3];
  
      return res;
    }
  
    static view( Loc, At, Up1 )
    {
      var Dir = At.sub(Loc).normalise();
      var Right = (Dir.cross(Up1)).normalise();
      var Up = Right.cross(Dir);
    
      return new matr(Right.x, Up.x, -Dir.x, 0,
                      Right.y, Up.y, -Dir.y, 0,
                      Right.z, Up.z, -Dir.z, 0,
                      -(Loc.scalarMul(Right)), -(Loc.scalarMul(Up)), (Loc.scalarMul(Dir)), 1);
    }
  
    static ortho( Left, Right, Bottom, Top, Near, Far )
    {
      return new matr(2 / (Right - Left), 0, 0, 0,
                      0, 2 / (Top - Bottom), 0, 0,
                      0, 0, 2 / (Near - Far), 0,
                      (Right + Left) / (Left - Right), (Top + Bottom) / (Bottom - Top), (Far + Near) / (Near - Far), 1);
    }
  
    static frustum( Left, Right, Bottom, Top, Near, Far ) {
      return new matr(2 * Near / (Right - Left), 0, 0, 0,
                      0, 2 * Near / (Top - Bottom), 0, 0,
                      (Right + Left) / (Right - Left), (Top + Bottom) / (Top - Bottom),
                      (Far + Near) / (Near - Far), -1,
                      0, 0, 2 * Near * Far / (Near - Far), 0);
    }
}

//import Parse from '../node_modules/parse/dist/parse.min.js';
//import PNG from '../node_modules/pngjs/browser.js';

class Texture {
    sampler;
    texture;
    w;
    h;
    isReady = false;

    constructorByArrayLow( rnd, w, h, level, internalFormat, border, format, type, bits ) {
        this.texture = rnd.gl.createTexture();
        this.w = w;
        this.h = h;
        
        rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

        rnd.gl.texImage2D(
            rnd.gl.TEXTURE_2D,
            level,            // mip level
            internalFormat,  // internal format
            w,            // width
            h,            // height
            border,            // border
            format,  // format
            type, // type
            bits);

        this.isReady = true;
    }


    constructorByArray( rnd, w, h, bits ) {
        this.constructorByArrayLow(
            rnd, w, h,
            0,            // mip level
            rnd.gl.RGBA,  // internal format
            0,            // border
            rnd.gl.RGBA,  // format
            rnd.gl.UNSIGNED_BYTE, // type
            bits);
    }

    setParams( rnd, params ) {
        rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

        params.forEach((param)=>{
            rnd.gl.samplerParameteri(this.sampler, param[0], param[1]);
        });
    }

    constructorFromFile( rnd, fileName ) {
        var img = new Image();
        img.src = "../" + fileName;
        img.onload = ()=>{
            this.constructorByArray(rnd, img.width, img.height, img);
        };
    }
    
    constructor( rnd, ...args ) {
        switch(args.length) {
        case 1:
            this.constructorFromFile(rnd, args[0]);
            break;
        case 3:
            this.constructorByArray(rnd, args[0], args[1], args[2]);
            break;
        case 8:
            this.constructorByArrayLow(rnd, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            break;
        }

        this.sampler = rnd.gl.createSampler();
        //rnd.gl.samplerParameteri(this.sampler, rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR);
        this.setParams(rnd, [
            [rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR],
        ]);
    }

    unbind( rnd, texUnit ) {
        if (this.isReady) {
            rnd.gl.activeTexture(rnd.gl.TEXTURE0 + texUnit);
            rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, null);
        }
    }

    bind( rnd, shader, samplerName, texUnit ) {
        if (this.isReady) {
            rnd.gl.activeTexture(rnd.gl.TEXTURE0 + texUnit);
        
            rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

            // Send unit to uniform

            var samplerLoc = rnd.gl.getUniformLocation(shader.program, samplerName);

            if (samplerLoc == undefined || samplerLoc == -1)
                console.log("FUCKING TEXTURE CAN'T FIND IT'S FUCKING SAMPLER");

            rnd.gl.uniform1i(samplerLoc, texUnit);
            
            rnd.gl.bindSampler(texUnit, this.sampler);
        }
    }
}

/* Bindings
0 - material
1 - camera
2 - test 
3 - sliders 
4 - lights
*/
class Ubo {
    buf;
    binding;

    constructor( rnd, size, newBinding, data = null )
    {
        this.buf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, this.buf);
        rnd.gl.bufferData(rnd.gl.UNIFORM_BUFFER, size, rnd.gl.DYNAMIC_DRAW);
        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, null);
        this.binding = newBinding;
    }

    submit( rnd, data )
    {
        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, this.buf);
        rnd.gl.bufferSubData(rnd.gl.UNIFORM_BUFFER, 0, data);
        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, null);
    }

    bind( rnd, shader, name ) {
        var index = rnd.gl.getUniformBlockIndex(shader.program, name);
        if (index != -1 && index != 4294967295)
        {
            rnd.gl.uniformBlockBinding(shader.program, index, this.binding);
            rnd.gl.bindBufferBase(rnd.gl.UNIFORM_BUFFER, this.binding, this.buf);
        }
        //else console.log("FUCK: can't bind to " + name);
    }
}

//var mtlLib = [];

class Material {
    ubo;
    Ka;
    Kd;
    Ks;
    Ph;
    Trans;

    texKd;
    texKs;
    texN;

    constructorEmpty() {
        this.Ka = [0.05, 0.1, 0.2, 1];
        this.Kd = [0.4, 0.5, 0.3],
        this.Ks = [0.4, 0.5, 0.3];
        this.Ph = 1;
        this.Trans = 1;
    }

    constructorWithParams( newKa, newKd, newKs, newPh, newTrans ) {
        this.Ka = newKa;
        this.Kd = newKd;
        this.Ks = newKs;
        this.Ph = newPh;
        this.Trans = newTrans;
        //this.texKd = newTex;
    }
    
    constructor( rnd, ...args ) {
        this.ubo = new Ubo(rnd, 4 * 4 * 3, 0); 
        
        switch (args.length)
        {
        case 0:
            this.constructorEmpty();
            break;
        case 5:
            this.constructorWithParams(args[0], args[1], args[2], args[3], args[4] );
        }

    }
    
    getMtlArray() {
        return new Float32Array(this.Ka.concat(this.Kd).concat(this.Trans).concat(this.Ks).concat(this.Ph));
    }
    
    apply( rnd, shader )
    {
        // Material ubo
        this.ubo.bind(rnd, shader, "mtl");
        this.ubo.submit(rnd, this.getMtlArray());

        // Texturies
        if (this.texKd != undefined && this.texKd.isReady)
        {
            rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "isTexKd"), 1);
            this.texKd.bind(rnd, shader, "texKd", 0);
        }
        else
            rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "isTexKd"), 0);
        if (this.texKs != undefined && this.texKs.isReady)
        {
            rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "isTexKs"), 1);
            this.texKs.bind(rnd, shader, "texKs", 0);
        }
        else
            rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "isTexKs"), 0);
        if (this.texN != undefined && this.texN.isReady)
        {
            rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "isTexN"), 1);
            this.texN.bind(rnd, shader, "texN", 0);
        }
        else
            rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "isTexN"), 0);
        
    }

    static addToMtlLib( rnd, name, mtl ) {
        if (rnd.mtlLib[name] == undefined)
            rnd.mtlLib[name] = mtl;
    }
    static applyFromLib( rnd, shader, name )
    {
        if (rnd.mtlLib[name] != undefined)
            rnd.mtlLib[name].apply(rnd, shader);
        else
            rnd.mtlLib['def'].apply(rnd, shader);

    }

    static async loadMtls( rnd, fileName ) {
        var pathA = fileName.split('/'),
            path = fileName.replace(pathA[pathA.length - 1], '');

        return fetch(fileName + '?' + Math.random().toString()).then((res)=>{ return res.text(); }).then((text)=>{
            var lines = text.split('\n');
            var outMtls = [];
            var curMtlName = null,
                Ka = [0.87, 0, 0.87],
                Kd = [0.87, 0, 0.87],
                Ks = [0.87, 0, 0.87],
                Ph = 1,
                Trans = 1,
                texKd,
                texKs,
                texN;
            lines.forEach((line)=>{
                line = line.replace('\r', '');

                var words = line.split(' ');

                if (words.length > 0)
                    switch (words[0])
                    {
                    case 'newmtl':
                        if (curMtlName != null)
                        {
                            outMtls[curMtlName] = new Material(rnd, Ka, Kd, Ks, Ph, Trans); // Submit mtl
                            outMtls[curMtlName].texKd = texKd;
                            outMtls[curMtlName].texKs = texKs;
                            outMtls[curMtlName].texN = texN;
                        }
                        curMtlName = words[1];
                        texKd = texKs = texN = undefined;
                        break;
                    case 'Ka':
                        Ka = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];
                        break;
                    case 'Kd':
                        Kd = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3])];
                        break;
                    case 'Ks':
                        Ks = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3])];
                        break;
                    case 'map_Kd':
                        texKd = new Texture(rnd, path + words[1]);
                        break;
                    case 'map_Ks':
                        texKs = new Texture(rnd, path + words[1]);
                        break;
                    case 'map_N':
                        TextEncoderStream = new Texture(rnd, path + words[1]);
                        break;
                    }
                
            });
            if (curMtlName != null)
            {
                outMtls[curMtlName] = new Material(rnd, Ka, Kd, Ks, Ph, Trans); // Submit mtl
                outMtls[curMtlName].texKd = texKd;
                outMtls[curMtlName].texKs = texKs;
                outMtls[curMtlName].texN = texN;
                //texKd = texKs = texN = undefined;
            }

            for (var elem in outMtls)
                this.addToMtlLib(rnd, elem, outMtls[elem]);
        });
    }
}

class Shader {
    program;
    name;

    constructor() {
    }

    static async loadShaderPart( rnd, type, dirName ) {
        let source = "";

        var result;

        if (type === rnd.gl.VERTEX_SHADER)
            result = fetch('./shaders/' + dirName + '/vert.glsl?' + Math.random().toString()).then((res)=>{return res.text();}).then((text)=>{source = text;});
        else if (type === rnd.gl.FRAGMENT_SHADER)
            result = fetch('./shaders/' + dirName + '/frag.glsl?' + Math.random().toString()).then((res)=>{return res.text();}).then((text)=>{source = text;});

        return result.then(()=>{
            const shader = rnd.gl.createShader(type);
          
            rnd.gl.shaderSource(shader, source);
            rnd.gl.compileShader(shader);
            if (!rnd.gl.getShaderParameter(shader, rnd.gl.COMPILE_STATUS))
            {
                console.log("SHADER POOPED -> " + rnd.gl.getShaderInfoLog(shader));
                 alert("FUCKING SHADER FUCKED UP");
            }
      
            return shader;
        });
    }

    async loadShader( rnd, newName ) {
        var v_shader;
        var f_shader;

        this.name = newName;

        this.program = rnd.gl.createProgram();

        var result = Promise.all([Shader.loadShaderPart(rnd, rnd.gl.VERTEX_SHADER,   this.name).then((shader)=>{v_shader = shader;}),
                                  Shader.loadShaderPart(rnd, rnd.gl.FRAGMENT_SHADER, this.name).then((shader)=>{f_shader = shader;})]);

        return result.then(()=>{
            rnd.gl.attachShader(this.program, v_shader);
            rnd.gl.attachShader(this.program, f_shader);
            rnd.gl.linkProgram(this.program);
            
            if (!rnd.gl.getProgramParameter(this.program, rnd.gl.LINK_STATUS))
                alert("OOH FUCK");
        });
    }
    use( rnd ) {
        rnd.gl.useProgram(this.program);
    }
}

class Vertex {
    p; // pos
    n; // normal
    t; // texture coord
    
    constructor( newP, newN, newT ) {
        this.p = newP;
        this.n = newN;
        this.t = newT;
    }

    static pLen() {
        return 4;
    }

    static nLen() {
        return 4;
    }

    static tLen() {
        return 2;
    }


    static len() {
        return Vertex.pLen() + Vertex.nLen() + Vertex.tLen();
    }

}
class Topology {
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

    getTexArray() {

        for (var i = 0; i < this.Vertexes.length; i++)
            outTextA[i] = vertexesA[i].t;
        return outTextA;
    };

    static setByPosArrayAndColor( posA, newIndexesA ) {
        var newT = new Topology([], []);

        for (var i = 0; i < posA.length / 4; i++)
            newT.vertexesA[i] = new Vertex([posA[i * 4], posA[i * 4 + 1], posA[i * 4 + 2], posA[i * 4 + 3]], [1, 0, 0, 1], [0, 0]);
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
            v[i] = p[i].concat(p[i]).concat([1, 0, 0, 1, 0, 0]);

        var inds = [0, 1, 2,
                    0, 2, 3,
                    0, 3, 1,
                    1, 2, 3];

        return new Topology(v, inds, 1);
        //return Topology.setByPosArrayAndColor(p, inds, [1, 0, 1, 1]);
    }

    static createScreenRect() {
        return new Topology([[-1, -1, 0, 1, 0, 0, 0, 1, 0, 0],
                            [1,  -1, 0, 1, 0, 0, 0, 1, 1, 0],
                            [-1,  1, 0, 1, 0, 0, 0, 1, 0, 1],
                            [1,   1, 0, 1, 0, 0, 0, 1, 1, 1]],
                            [0, 1, 3, 0, 2, 3], 1)
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
            v[i] = p[i].concat(p[i]).concat([0, 0]);

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
            var outV = new Float32Array(this.vertexesA.length * Vertex.len());

            for (var i = 0; i < this.vertexesA.length * Vertex.len(); i++)
                outV[i] = this.vertexesA[Math.floor(i / Vertex.len())][i % Vertex.len()];
            
            return  outV;
        }

        var outV = [];
        this.vertexesA.forEach((elem) => {
            outV = outV.concat(elem.p.concat(elem.n).concat(elem.t));
        });
        return new Float32Array(outV);
    }
}

class Prim {
    vertexBuffer;
    vertexArray;
    indexesA;
    primVAO;
    TrCount;
    shader;
    mtlName;

    drawType;

    tex;
    
    constructor( rnd, newShader, topology, newMtlName ) {
        this.shader = newShader;
        this.drawType = rnd.gl.TRIANGLES;
        if (newMtlName == undefined)
            this.mtlName = 'def';
        else
            this.mtlName = newMtlName;

        this.primVAO = rnd.gl.createVertexArray();
        rnd.gl.bindVertexArray(this.primVAO);

        // Copy vertex array
        this.vertexArray = topology.getVertexArray();
        this.indexesA = new Uint32Array(topology.indexesA);
        //topology.vertexesA.map((elem)=>{this.vertexArray.concat(elem.p.concat(elem.n).concat(elem.c));});
        this.TrCount = Math.floor(this.indexesA.length / 3);
        //const posArray = Float32Array(topology.getPosArray());
        //const normalArray = Float32Array(topology.getNormalArray());
        //const colorArray = Float32Array(topology.getColorArray());
        
        // Copy info
        var Buf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, Buf);
        rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, this.vertexArray, rnd.gl.STATIC_DRAW);

         
        var indexBuf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexesA, rnd.gl.STATIC_DRAW);

        // Bind to shader

        var posLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_pos');
        if (posLoc != -1)
        { // console.log(`Can't find "in_pos".`);
            rnd.gl.enableVertexAttribArray(posLoc);
            rnd.gl.vertexAttribPointer(
                posLoc,  
                Vertex.pLen(),
                rnd.gl.FLOAT,
                false,
                Vertex.len() * 4,
                0,
            );  
        }
        var normalLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_norm');
        if (normalLoc != -1)
        { // console.log(`Can't find "in_norm".`);
            rnd.gl.enableVertexAttribArray(normalLoc);
            rnd.gl.vertexAttribPointer(
                normalLoc,  
                Vertex.nLen(),
                rnd.gl.FLOAT,
                false,
                Vertex.len() * 4,
                Vertex.pLen() * 4,
            );
        }
        
        var texLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_tex');
        if (texLoc != -1)  
        { // console.log(`Can't find "in_tex".`);
            rnd.gl.enableVertexAttribArray(texLoc);
            rnd.gl.vertexAttribPointer(
                texLoc,  
                Vertex.tLen(),
                rnd.gl.FLOAT,
                false,
                Vertex.len() * 4,
                (Vertex.pLen() + Vertex.nLen()) * 4,
            );
        }
    }

    
    draw( rnd, camera, matrWP ) {
        camera.updateUbo(rnd, this.shader);
        //this.mtl.apply(gl, this.shader);

        
        //rnd.gl.clearColor(1, 0.6, 0.8, 1);
        rnd.gl.bindVertexArray(this.primVAO);
        rnd.gl.useProgram(this.shader.program);
        
        // Apply texture 
        Material.applyFromLib(rnd, this.shader, this.mtlName);
        // matrs world
 
        let tmpLoc = rnd.gl.getUniformLocation(this.shader.program, "matrWP");
        if (tmpLoc != -1)
            rnd.gl.uniformMatrix4fv(tmpLoc, true, matrWP.M);
        tmpLoc = rnd.gl.getUniformLocation(this.shader.program, "matrVP");
        if (tmpLoc != -1)
            rnd.gl.uniformMatrix4fv(tmpLoc, true, camera.matrVP.M);
        tmpLoc = rnd.gl.getUniformLocation(this.shader.program, "matrProj");
        if (tmpLoc != -1)
            rnd.gl.uniformMatrix4fv(tmpLoc, true, camera.matrProj.M);
        
        rnd.gl.drawElements(this.drawType, this.TrCount * 3, rnd.gl.UNSIGNED_INT, 0);
    }
}

class Model {
    name;
    prims = [];
    primCounter = 0;

    constructFromToppology( rnd, newShader, topology ) {
        this.prims[this.prims.length] = new Prim(rnd, newShader, topology);
    }

    constructFromPrim( rnd, prim ) {
        this.prims[this.prims.length] = prim;
    }


    constructEmpty() {
        
    }
    constructor( ...args ) {
        switch (args.length)
        {
        case 0:
            this.constructEmpty();
            break;
        case 2:
            this.constructFromPrim(args[0], args[1]);
            break;
        case 3:
            this.constructFromToppology(args[0], args[1], args[2]);
            break;
        }
    }

    draw( rnd, camera, matrWP = new math.matr()) {
        this.prims.forEach((elem)=>{
            elem.draw(rnd, camera, matrWP);
        });
    }

    addPrim( name, prim ) {
        this.prims[this.primCounter++] = prim;
        return;
    }

    async load( rnd, newShader, fileName ) {
        console.log("Loading " + fileName);
    
        var pathA = fileName.split('/'),
            path = fileName.replace(pathA[pathA.length - 1], '');

        var mtlsPromise = null;
        var out;
        var outP = fetch(fileName + '?' + Math.random().toString()).then((res)=>{return res.text();}).then((source)=>{
            this.name = fileName;
            var lines = source.split('\n');


            var pA = [];
            var nA = [];
            var tA = [];

            var iA = [];
            var vA = [];
            var pCounter = 1, nCounter = 1, tCounter = 1, vCounter = 0;
            var curPrimName = null;
            var useMtl = 'def';

            lines.forEach((elem)=>{
                elem = elem.replace('\r', '');
                var words = elem.split(' ');
                switch (words[0])
                {
                case 'g':
                case 'o': // Create new prim
                    if (curPrimName != null)
                    {
                        this.addPrim(curPrimName, new Prim(rnd.gl, newShader, new Topology(vA, iA, 1), useMtl));
                    } // Submit prim
                    iA = [];
                    vA = [];
                    vCounter = 0;

                    if (words.length === 3)
                        curPrimName = words[1] + "/" + words[2];
                    else
                        curPrimName = words[1];    
                    break;
                case 'v': // Position
                    if (words.length == 5)
                        pA[pCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), parseFloat(words[4])];
                    else
                        pA[pCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];
                    break;
                case 'vn': // Normal
                    if (words.length == 5)
                        nA[nCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), parseFloat(words[4])];
                    else
                        nA[nCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];
                    break;
                case 'vt': // Texture
                    tA[tCounter++] = [parseFloat(words[1]), parseFloat(words[2])];
                    break;
                case 'f': // Indexes
                    var getV = ( inds )=>{
                        if (vi[1] != '')
                            return pA[vi[0]].concat(nA[vi[2]]).concat(tA[vi[1]]);
                        else
                            return pA[vi[0]].concat(nA[vi[2]]).concat([0, 0]);
                    };
                    var vi = words[1].split('/');
                    vA[vCounter] = getV(vi);
                    iA[vCounter] = vCounter++;

                    vi = words[2].split('/');
                    vA[vCounter] = getV(vi);
                    iA[vCounter] = vCounter++;

                    vi = words[3].split('/');
                    vA[vCounter] = getV(vi);
                    iA[vCounter] = vCounter++;
                    break;
                case 'mtllib': // Load material lib
                    if (mtlsPromise != null)
                        mtlsPromise = new Promise.all([mtlsPromise, this.loadMtls(rnd, path + words[1])]);
                    else
                        mtlsPromise = Material.loadMtls(rnd, path + words[1]);
                    break;
                case 'usemtl': // Use material
                    useMtl = words[1];
                    break;
                }
            });
            if (curPrimName != null)
            {
                this.addPrim(curPrimName, new Prim(rnd, newShader, new Topology(vA, iA, 1), useMtl));
            } // Submit prim
            
        }).then((elem)=>{return out = elem});

        if (mtlsPromise == null)
            return outP;
        return Promise.all([outP, mtlsPromise]).then(()=>{ return out; });        
    }
}

class Targets {
    frameBuffer;

    texPos;
    texNIsShade;
    texKa;
    texKd;
    texKsPh;
    texColorTrans;

    depthTex;

    primVAO;

    static createTargetTex( rnd, attachment ) {
        var outTex = new Texture(rnd, rnd.W, rnd.H,
            0,                        // mip level
            rnd.gl.RGBA32F, // internal format
            0,                        // border
            rnd.gl.RGBA,   // format
            rnd.gl.FLOAT,      // type
            null);
        //this.colorTex = new Texture(rnd, "../models/cow_tex.png");
        outTex.setParams(rnd, [
            [rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR],
            [rnd.gl.TEXTURE_WRAP_S, rnd.gl.CLAMP_TO_EDGE],
            [rnd.gl.TEXTURE_WRAP_T, rnd.gl.CLAMP_TO_EDGE]
        ]);
        rnd.gl.framebufferTexture2D(rnd.gl.FRAMEBUFFER, rnd.gl.COLOR_ATTACHMENT0 + attachment, rnd.gl.TEXTURE_2D, outTex.texture, 0);

        return outTex;
    }

    constructor( rnd ) {
       
        this.frameBuffer = rnd.gl.createFramebuffer();
        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, this.frameBuffer);

        rnd.gl.drawBuffers([
            rnd.gl.COLOR_ATTACHMENT0,
            rnd.gl.COLOR_ATTACHMENT1,
            rnd.gl.COLOR_ATTACHMENT2,
            rnd.gl.COLOR_ATTACHMENT3,
            rnd.gl.COLOR_ATTACHMENT4,
            rnd.gl.COLOR_ATTACHMENT5,
        ]);

        // Texturies
        this.texPos =        Targets.createTargetTex(rnd, 0);
        this.texNIsShade =   Targets.createTargetTex(rnd, 1);
        this.texKa =         Targets.createTargetTex(rnd, 2);
        this.texKd =         Targets.createTargetTex(rnd, 3);
        this.texKsPh =       Targets.createTargetTex(rnd, 4);
        this.texColorTrans = Targets.createTargetTex(rnd, 5);
        this.depthTex = new Texture(rnd, rnd.W, rnd.H,
            0,                        // mip level
            rnd.gl.DEPTH_COMPONENT24, // internal format
            0,                        // border
            rnd.gl.DEPTH_COMPONENT,   // format
            rnd.gl.UNSIGNED_INT,      // type
            null);
        this.depthTex.setParams(rnd, [
            [rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR],
            [rnd.gl.TEXTURE_MAG_FILTER, rnd.gl.LINEAR],
            [rnd.gl.TEXTURE_WRAP_S, rnd.gl.CLAMP_TO_EDGE],
            [rnd.gl.TEXTURE_WRAP_T, rnd.gl.CLAMP_TO_EDGE]
        ]);
        rnd.gl.framebufferTexture2D(rnd.gl.FRAMEBUFFER, rnd.gl.DEPTH_ATTACHMENT, rnd.gl.TEXTURE_2D, this.depthTex.texture, 0);


        //// Making target prim
        // 
        //var posLoc = rnd.gl.getAttribLocation(shader.program, 'in_pos');
        //if (posLoc === -1)
        //    console.log(`Can't find "in_pos".`);
        //var texLoc = rnd.gl.getAttribLocation(shader.program, 'in_tex');
        //if (texLoc === -1)
        //    console.log(`Can't find "in_tex".`);
    //
        //this.primVAO = rnd.gl.createVertexArray();
        //rnd.gl.bindVertexArray(this.primVAO);
//
        //var Buf = rnd.gl.createBuffer();
//
        //rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, Buf);
        //rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, vA, rnd.gl.STATIC_DRAW);
//
        //var indexBuf = rnd.gl.createBuffer();
//
        //rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        //rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, indA, rnd.gl.STATIC_DRAW);
//
        //// Bind to shader
//
        //rnd.gl.enableVertexAttribArray(posLoc);
        //rnd.gl.vertexAttribPointer(
        //    posLoc,  
        //    4,
        //    rnd.gl.FLOAT,
        //    false,
        //    (4 + 2) * 4,
        //    0,
        //);
        //
        //rnd.gl.enableVertexAttribArray(texLoc);
        //rnd.gl.vertexAttribPointer(
        //    texLoc,  
        //    2,
        //    rnd.gl.FLOAT,
        //    false,
        //    (4 + 2) * 4,
        //    4 * 4,
        //);
    }

    applyFB( rnd ) {
        //rnd.gl.enable(rnd.gl.DEPTH_TEST);

        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, this.frameBuffer);

        rnd.gl.clearColor(0, 0, 0, 0);
        //rnd.gl.clearColor(0, 0, 0, 0);
        rnd.gl.clear(rnd.gl.COLOR_BUFFER_BIT | rnd.gl.DEPTH_BUFFER_BIT);

        //gl.enable(gl.CULL_FACE);
    }

    static applyCanvas( rnd ) {
        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, null);
        rnd.gl.clearColor(0, 0, 0, 0);   // clear to white
        rnd.gl.clear(rnd.gl.COLOR_BUFFER_BIT | rnd.gl.DEPTH_BUFFER_BIT);
    }

    bindSamplers( rnd, shader ) {
        this.texPos.bind(rnd, shader, "inPos", 0);
        this.texNIsShade.bind(rnd, shader, "inNIsShade", 1);
        this.texKa.bind(rnd, shader, "inKa", 2);
        this.texKd.bind(rnd, shader, "inKd", 3);
        this.texKsPh.bind(rnd, shader, "inKsPh", 4);
        this.texColorTrans.bind(rnd, shader, "inColorTrans", 5);
    }
    
    unbindSamplers( rnd ) {
        this.texPos.       unbind(rnd, 0);
        this.texNIsShade.  unbind(rnd, 1);
        this.texKa.        unbind(rnd, 2);
        this.texKd.        unbind(rnd, 3);
        this.texKsPh.      unbind(rnd, 4);
        this.texColorTrans.unbind(rnd, 5);
    }
    
    
}

class Lighting { 
    dirShader;
    dirPrim;
    dirLights = [];
    dirUBO;

    pointShader;
    pointPrim;
    pointLights = [];
    pointUBO;
    debugPointModel;

    constructor() {

    }

    async init( rnd ) {
        let rectTop = Topology.createScreenRect();

        // Directional
        this.dirShader = await rnd.createShader('lights/dir');
        this.dirPrim = await rnd.createPrim(this.dirShader, rectTop);
        this.dirUBO = new Ubo(rnd, 4 * 4 * 2, 4);

        // Point
        this.pointShader = await rnd.createShader('lights/point');
        this.pointPrim = await rnd.createPrim(this.pointShader, rectTop);
        this.pointUBO = new Ubo(rnd, 4 * 4 * 2, 4);

        this.debugPointModel = rnd.createModel(rnd.createPrim(Topology.createCube()));
    }

    draw( rnd, camera, target ) {
        rnd.gl.enable(rnd.gl.BLEND);
        rnd.gl.disable(rnd.gl.DEPTH_TEST);
        
        rnd.gl.blendEquation(rnd.gl.FUNC_ADD);
        rnd.gl.blendFunc(rnd.gl.ONE, rnd.gl.ONE);
    
        // Direction lights
        this.dirShader.use(rnd);
        target.bindSamplers(rnd, this.dirShader);
        for (let i = 0; i < this.dirLights.length; i++)
        {
            this.dirUBO.submit(rnd, new Float32Array(this.dirLights[i].getDataA()));
            this.dirUBO.bind(rnd, this.dirShader, 'dirLight');
            this.dirPrim.draw(rnd, camera, new matr());
        }

        // Point lights
        this.pointShader.use(rnd);
        target.bindSamplers(rnd, this.pointShader);
        for (let i = 0; i < this.pointLights.length; i++)
        {
            this.pointUBO.submit(rnd, new Float32Array(this.pointLights[i].getDataA()));
            this.pointUBO.bind(rnd, this.pointShader, 'pointLight');
            this.pointPrim.draw(rnd, camera, new matr());
        }

        rnd.gl.disable(rnd.gl.BLEND);
        rnd.gl.enable(rnd.gl.DEPTH_TEST);

        target.unbindSamplers(rnd);
    }

    drawDebug( rnd, camera ) {
        for (let i = 0; i < this.pointLights.length; i++)
            rnd.drawModel(this.debugPointModel, matr.translate(new vec3(this.pointLights[i].pos[0], this.pointLights[i].pos[1], this.pointLights[i].pos[2])));
    }

    regDirLight( light ) {
        if (light instanceof DirLight)
        this.dirLights[this.dirLights.length] = light;
    }

    regPointLight( light ) {
        if (light instanceof PointLight)
        this.pointLights[this.pointLights.length] = light;
    }
    
}

class DirLight {
    dir;
    color;
    intensity;
    visibility = true;

    constructor( rnd, newDir, newColor, newIntensity ) {
        this.dir = newDir;
        this.color = newColor;
        this.intensity = newIntensity;
        rnd.lighting.regDirLight(this);
    }

    setVisibility( newValue ) {
        this.visibility = newValue;
    }
    getDataA() {
        return this.dir.concat([1]).concat(this.color).concat([this.intensity]);
    }
}


class PointLight {
    pos;
    color;
    intensity;
    visibility = true;

    constructor( rnd, newPos, newColor, newIntensity ) {
        this.pos = newPos;
        this.color = newColor;
        this.intensity = newIntensity;
        rnd.lighting.regPointLight(this);
    }

    setVisibility( newValue ) {
        this.visibility = newValue;
    }
    getDataA() {
        return this.pos.concat([1]).concat(this.color).concat([this.intensity]);
    }
}

// export {Ubo, Material, Shader, Topology, Model, Prim, Targets};

class Camera {
    matrProj;
    pos;
    at;
    up;
    right;
    dir;
    dirLen;
    matrVP;
    ubo;

    lighting;
    isShared = true;
    
    constructor( rnd, newPos, newAt, newUp, enableMovement ) {
        this.matrProj = Camera.createDefMatrProj(rnd.W, rnd.H);
        this.pos = newPos;
        this.at = newAt;
        this.up = newUp;
        this.update();

        this.isShared = enableMovement;
        rnd.canvas.onmousemove = (e)=>{this.onMouseMove(e);};
        rnd.canvas.onwheel = (e)=>{this.onMouseWheel(e);};
        rnd.canvas.oncontextmenu = ()=>{return false;};
        
        // Ubo init
        this.ubo = new Ubo(rnd, 4 * 4 * 2, 1);
    }

    static createDefMatrProj( w, h ) {
        var coef = parseFloat(h) / parseFloat(w);
        return matr.frustum(-1, 1, -coef, coef, 1, 1000);
    }

    update() {
        this.dir = this.at.sub(this.pos).normalise();
        this.right = this.dir.cross(new vec3(0, -1, 0)).normalise();
        this.up = this.dir.cross(this.right);
        this.dirLen = this.at.sub(this.pos).length(); 

        this.matrVP = matr.view(this.pos, this.at, this.up);
    }

    updateSize( rnd ) {
        if (rnd.W != rnd.canvas.clientWidth ||
            rnd.H != rnd.canvas.clientHeight)
        {
            rnd.resize(rnd.canvas.clientWidth, rnd.canvas.clientHeight);
            this.matrProj = Camera.createDefMatrProj(rnd.W, rnd.H);
        }
    }

    updateUbo( rnd, shader ) {
        this.ubo.submit(rnd, new Float32Array(this.pos.toFltA().concat([1]).
                                 concat(this.at.toFltA().concat([1]))));
        this.ubo.bind(rnd, shader, 'camera');
    } 

    onMouseMove( e ) {
        if (!this.isShared)
            return;

        if (e.buttons & 1)
        {
            this.pos = this.at.add(this.pos.sub(this.at).mulMatr( matr.rotate(-0.0015 * e.movementX, this.up)));
            this.pos = this.at.add(this.pos.sub(this.at).mulMatr( matr.rotate(0.0015 * e.movementY, this.right)));
            this.update();
        }

        if (e.buttons & 2)
        {
            var delta = this.right.mulNum(this.dirLen * 0.001 * e.movementX).add(this.up.mulNum(this.dirLen * 0.001 * e.movementY));
            this.pos = this.pos.add(delta);
            this.at = this.at.add(delta);
            this.update();
        }

        //e.clientX = 0;

        //e.clientX -= e.movementX;
        //e.clientY -= e.movementY;

        
    }

    onMouseWheel( e ) {
        if (!this.isShared)
            return;

        this.pos = this.at.add(this.pos.sub(this.at).mulNum(Math.pow(1.1, e.deltaY * 0.01)));
        this.update();
        e.preventDefault();
    }
}

//class ShaderSlider4 {
//    ubo;
//    shaderUboName;
//    xID;
//    yID;
//    zID;
//    wID;
//
//    static getSliderHtml( id, label, min, max, step ) {
//        return `<label id="${id}/Lable"> ${label}: <input type="range" id="${id}" min="${min}" max="${max}" step="${step}"/></label><br/>`;
//    }
//
//    constructor( rnd, idForAdd, newShaderUboName, min, max, def ) {
//        this.shaderUboName = newShaderUboName;
//        this.ubo = new Ubo(rnd, 16, 3); // one vec4 
//
//        // add sliders
//
//        var AddObj = document.getElementById(idForAdd);
//
//        if (AddObj == undefined || AddObj == null)
//            allert("fuck");
//        
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider1", newShaderUboName.toString() + ".x", min, max, (max - min) * 0.01);
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider2", newShaderUboName.toString() + ".y", min, max, (max - min) * 0.01);
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider3", newShaderUboName.toString() + ".z", min, max, (max - min) * 0.01);
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider4", newShaderUboName.toString() + ".w", min, max, (max - min) * 0.01);
//        this.xID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider1");
//        this.yID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider2");
//        this.zID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider3");
//        this.wID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider4");
//
//        this.xID.value = def;
//        this.yID.value = def;
//        this.zID.value = def;
//        this.wID.value = def;
//    }
//
//    update( rnd, shader ) {
//        var vec4Value = new Float32Array([parseFloat(this.xID.value),
//                                          parseFloat(this.yID.value),
//                                          parseFloat(this.zID.value),
//                                          parseFloat(this.wID.value)]);
//        this.ubo.submit(rnd, vec4Value);
//        this.ubo.bind(rnd, shader, this.shaderUboName);
//    }
//}
//

class Render {
    canvas;
    gl;
    W;
    H;
    mtlLib = [];
    defShader;
    target;
    targetShader;
    targetPrim;
    
    camera;
    

    #initGl() {
        this.gl = this.canvas.getContext("webgl2");

        this.canvas.onresize = this.updateSize;

        this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    clearFB() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    constructor( canvasName ) {
        //
        this.DirLight = DirLight;
        //
        this.PointLight = PointLight;
    
        
        this.canvas = document.getElementById(canvasName);
        this.#initGl();

        // Def render params
        this.gl.enable(this.gl.DEPTH_TEST);
        //this.gl.enable(this.gl.CULL_FACE);

        // Extentions
        this.gl.getExtension("EXT_color_buffer_float");
        this.gl.getExtension("OES_texture_float_linear");

    }

    async init() { // Init def values function
        // Load def shader
        Material.addToMtlLib(this, 'def', new Material(this));
        this.defShader = await this.createShader('default_for_target');
        
        this.target = new Targets(this);

        this.lighting = new Lighting();
        await this.lighting.init(this);

        this.camera = new Camera(this, new vec3(10, 10, 10), new vec3(0, 0, 0), new vec3(0, 1, 0), 1); // DEFAULT camera
    }

    async createShader( name ) {
        var shader = new Shader();

        await shader.loadShader(this, name);
        return shader;
    }

    createModel( ...args ) {
        switch (args.length) {
            case 0: // Empty
                return new Model();
            case 1: // Load modal with def shader
                if (typeof(args[0]) == 'string')
                {
                    var outM = new Model();
                    
                    return outM.load(this, this.defShader, args[0]).then(()=>{ return outM; });
                }
                else
                    if (args[0] instanceof Prim)
                    return new Model(this, args[0]);
            case 2: // Load modal with custom shader
                if (args[0] instanceof Shader && typeof(args[1]) == 'string')
                //{
                    var outM = new Model();

                    return outM.load(this, args[0], args[1]).then(()=>{ return outM; });
                //}
        }
    }

    createTopology( ...args ) {
        switch (args.length) {
            case 0: // Empty
                return new Topology([], []);
            case 2: // Full
                return new Topology(args[0], args[1]);
            case 3: // Full with flag
                return new Topology(args[0], args[1], args[2]);
        }
    }

    createPrim( ...args ) {
        switch (args.length) {
            case 1:
                if (args[0] instanceof Topology)
                    return new Prim(this, this.defShader, args[0]);
            case 2:
                if (args[0] instanceof Shader && args[1] instanceof Topology)
                    return new Prim(this, args[0], args[1]);
                else if (args[0] instanceof Topology && args[1] instanceof Material)
                    return new Prim(this, this.defShader, args[0], args[1]);
            case 3:
                if (args[0] instanceof Shader && args[1] instanceof Topology && args[2] instanceof Material)
                    return new Prim(this, args[0], args[1], args[2]);
        }
    }

    resize( newW, newH ) {
        //var canvasStyle = window.getComputedStyle(this.canvas);

        // this.canvas.height = this.H = parseFloat(canvasStyle.height);
        // this.canvas.width  = this.W = parseFloat(canvasStyle.width);

        this.canvas.width = this.W = newW;
        this.canvas.height = this.H = newH;
        this.gl.viewport(0, 0, this.W, this.H);
        //this.gl = this.canvas.getContext("webgl2");

        //this.gl.drawingBufferWidth = this.W; 
        //this.gl.drawingBufferHeight = this.H; 
        //this.gl = this.canvas.getContext("webgl2");
    }

    drawStack = [];

    drawModel( model, matrW ) {
        this.drawStack[this.drawStack.length] = [model, matrW];
    }

    render() {
        this.camera.updateSize(this);

        //this.lighting.drawDebug(this, this.camera);

        // Draw to target
        this.target.applyFB(this);
        for (let i = 0; i < this.drawStack.length; i++)
            this.drawStack[i][0].draw(this, this.camera, this.drawStack[i][1]);
        
        // Draw to canvas
        Targets.applyCanvas(this);
        this.lighting.draw(this, this.camera, this.target);
        this.drawStack.length = 0;
    }
}

export { DirLight, PointLight, Render as default, matr, vec3 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJtYXRoL21hdGguanMiLCJyZW5kZXIvdGV4dHVyZS5qcyIsInJlbmRlci9tYXRlcmlhbC5qcyIsInJlbmRlci9zaGFkZXIuanMiLCJyZW5kZXIvdG9wb2xvZ3kuanMiLCJyZW5kZXIvcHJpbS5qcyIsInJlbmRlci90YXJnZXQuanMiLCJyZW5kZXIvbGlnaHQuanMiLCJyZW5kZXIvcmVuZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFZlYzNcclxuXHJcbmV4cG9ydCBjbGFzcyB2ZWMzIHtcclxuXHJcbiAgICB4ID0gMDtcclxuICAgIHkgPSAwO1xyXG4gICAgeiA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCBuZXdYID0gMCwgbmV3WSA9IDAsIG5ld1ogPSAwICkge1xyXG4gICAgICAgIHRoaXMueCA9IG5ld1g7XHJcbiAgICAgICAgdGhpcy55ID0gbmV3WTtcclxuICAgICAgICB0aGlzLnogPSBuZXdaO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZCggb3RoZXIgKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB2ZWMzKHRoaXMueCArIG90aGVyLngsIHRoaXMueSArIG90aGVyLnksIHRoaXMueiArIG90aGVyLnopO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnopO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxhck11bChvdGhlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy54ICogb3RoZXIueCArIHRoaXMueSAqIG90aGVyLnkgKyB0aGlzLnogKiBvdGhlci56O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKCBvdGhlciApIHtcclxuICAgICAgcmV0dXJuIG5ldyB2ZWMzKHRoaXMueSAqIG90aGVyLnogLSB0aGlzLnogKiBvdGhlci55LCBvdGhlci54ICogdGhpcy56IC0gdGhpcy54ICogb3RoZXIueiwgdGhpcy54ICogb3RoZXIueSAtIG90aGVyLnggKiB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIG11bCggb3RoZXIgKSB7XHJcbiAgICAgIHJldHVybiBuZXcgdmVjMyh0aGlzLnggKiBvdGhlci54LCB0aGlzLnkgKiBvdGhlci55LCB0aGlzLnogKiBvdGhlci55KTtcclxuICAgIH1cclxuICAgIG11bE51bSggbiApIHtcclxuICAgICAgcmV0dXJuIG5ldyB2ZWMzKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Yiggb3RoZXIgKSB7XHJcbiAgICAgIHJldHVybiBuZXcgdmVjMyh0aGlzLnggLSBvdGhlci54LCB0aGlzLnkgLSBvdGhlci55LCB0aGlzLnogLSBvdGhlci56KTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxpc2UoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bE51bSgxIC8gdGhpcy5sZW5ndGgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsTWF0ciggbSApXHJcbiAgICB7XHJcbiAgICAgIHZhciB3ID0gdGhpcy54ICogbS5NWzAgKiA0ICsgM10gKyB0aGlzLnkgKiBtLk1bMSAqIDQgKyAzXSArIHRoaXMueiAqIG0uTVsyICogNCArIDNdICsgbS5NWzMgKiA0ICsgM107XHJcblxyXG4gICAgICByZXR1cm4gbmV3IHZlYzMoKHRoaXMueCAqIG0uTVswICogNCArIDBdICsgdGhpcy55ICogbS5NWzEgKiA0ICsgMF0gKyB0aGlzLnogKiBtLk1bMiAqIDQgKyAwXSArIG0uTVszICogNCArIDBdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAodGhpcy54ICogbS5NWzAgKiA0ICsgMV0gKyB0aGlzLnkgKiBtLk1bMSAqIDQgKyAxXSArIHRoaXMueiAqIG0uTVsyICogNCArIDFdICsgbS5NWzMgKiA0ICsgMV0pIC8gdyxcclxuICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnggKiBtLk1bMCAqIDQgKyAyXSArIHRoaXMueSAqIG0uTVsxICogNCArIDJdICsgdGhpcy56ICogbS5NWzIgKiA0ICsgMl0gKyBtLk1bMyAqIDQgKyAyXSkgLyB3KTtcclxuICAgIH1cclxuXHJcbiAgICB0b0ZsdEEoKSB7XHJcbiAgICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnksIHRoaXMuel07XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuLy8gTWF0cnNcclxuZXhwb3J0IGNsYXNzIG1hdHIge1xyXG4gICAgTTtcclxuICBcclxuICAgIGludmVyc2UoKSB7XHJcbiAgICAgIHZhciBkZXQgPSB0aGlzLmxlbmd0aCgpO1xyXG4gICAgICB2YXIgciA9IG5ldyBtYXRyKCk7XHJcbiAgICBcclxuICAgICAgaWYgKGRldCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBtYXRyKCk7XHJcbiAgXHJcbiAgICAgIC8qIGJ1aWxkIGFkam9pbnQgbWF0cml4ICovXHJcbiAgICAgIHIuTVswICogNCArIDBdID1cclxuICAgICAgICB0aGlzLmRldGVybTN4Myh0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgMl0sIHRoaXMuTVsxICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMiAqIDQgKyAyXSwgdGhpcy5NWzIgKiA0ICsgM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMV0sIHRoaXMuTVszICogNCArIDJdLCB0aGlzLk1bMyAqIDQgKyAzXSkgLyBkZXQ7XHJcbiAgICAgIHIuTVsxICogNCArIDBdID1cclxuICAgICAgICAtdGhpcy5kZXRlcm0zeDModGhpcy5NWzEgKiA0ICsgMF0sIHRoaXMuTVsxICogNCArIDJdLCB0aGlzLk1bMSAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMF0sIHRoaXMuTVsyICogNCArIDJdLCB0aGlzLk1bMiAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMF0sIHRoaXMuTVszICogNCArIDJdLCB0aGlzLk1bMyAqIDQgKyAzXSkgLyBkZXQ7XHJcbiAgICAgIHIuTVsyICogNCArIDBdID1cclxuICAgICAgICB0aGlzLmRldGVybTN4Myh0aGlzLk1bMSAqIDQgKyAwXSwgdGhpcy5NWzEgKiA0ICsgMV0sIHRoaXMuTVsxICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAwXSwgdGhpcy5NWzIgKiA0ICsgMV0sIHRoaXMuTVsyICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLk1bMyAqIDQgKyAwXSwgdGhpcy5NWzMgKiA0ICsgMV0sIHRoaXMuTVszICogNCArIDNdKSAvIGRldDtcclxuICAgICAgci5NWzMgKiA0ICsgMF0gPVxyXG4gICAgICAgIC10aGlzLmRldGVybTN4Myh0aGlzLk1bMSAqIDQgKyAwXSwgdGhpcy5NWzEgKiA0ICsgMV0sIHRoaXMuTVsxICogNCArIDJdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMF0sIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMiAqIDQgKyAyXSxcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuTVszICogNCArIDBdLCB0aGlzLk1bMyAqIDQgKyAxXSwgdGhpcy5NWzMgKiA0ICsgMl0pIC8gZGV0O1xyXG4gICAgIFxyXG4gICAgICByLk1bMCAqIDQgKyAxXSA9XHJcbiAgICAgICAgLXRoaXMuZGV0ZXJtM3gzKHRoaXMuTVswICogNCArIDFdLCB0aGlzLk1bMCAqIDQgKyAyXSwgdGhpcy5NWzAgKiA0ICsgM10sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAxXSwgdGhpcy5NWzIgKiA0ICsgMl0sIHRoaXMuTVsyICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMV0sIHRoaXMuTVszICogNCArIDJdLCB0aGlzLk1bMyAqIDQgKyAzXSkgLyBkZXQ7XHJcbiAgICAgIHIuTVsxICogNCArIDFdID1cclxuICAgICAgICB0aGlzLmRldGVybTN4Myh0aGlzLk1bMCAqIDQgKyAwXSwgdGhpcy5NWzAgKiA0ICsgMl0sIHRoaXMuTVswICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAwXSwgdGhpcy5NWzIgKiA0ICsgMl0sIHRoaXMuTVsyICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLk1bMyAqIDQgKyAwXSwgdGhpcy5NWzMgKiA0ICsgMl0sIHRoaXMuTVszICogNCArIDNdKSAvIGRldDtcclxuICAgICAgci5NWzIgKiA0ICsgMV0gPVxyXG4gICAgICAgIC10aGlzLmRldGVybTN4Myh0aGlzLk1bMCAqIDQgKyAwXSwgdGhpcy5NWzAgKiA0ICsgMV0sIHRoaXMuTVswICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMF0sIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMiAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuTVszICogNCArIDBdLCB0aGlzLk1bMyAqIDQgKyAxXSwgdGhpcy5NWzMgKiA0ICsgM10pIC8gZGV0O1xyXG4gICAgICByLk1bMyAqIDQgKyAxXSA9XHJcbiAgICAgICAgdGhpcy5kZXRlcm0zeDModGhpcy5NWzAgKiA0ICsgMF0sIHRoaXMuTVswICogNCArIDFdLCB0aGlzLk1bMCAqIDQgKyAyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMF0sIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMiAqIDQgKyAyXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMF0sIHRoaXMuTVszICogNCArIDFdLCB0aGlzLk1bMyAqIDQgKyAyXSkgLyBkZXQ7XHJcbiAgICAgXHJcbiAgICAgIHIuTVswICogNCArIDJdID1cclxuICAgICAgICB0aGlzLmRldGVybTN4Myh0aGlzLk1bMCAqIDQgKyAxXSwgdGhpcy5NWzAgKiA0ICsgMl0sIHRoaXMuTVswICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgMl0sIHRoaXMuTVsxICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLk1bMyAqIDQgKyAxXSwgdGhpcy5NWzMgKiA0ICsgMl0sIHRoaXMuTVszICogNCArIDNdKSAvIGRldDtcclxuICAgICAgci5NWzEgKiA0ICsgMl0gPVxyXG4gICAgICAgIC10aGlzLmRldGVybTN4Myh0aGlzLk1bMCAqIDQgKyAwXSwgdGhpcy5NWzAgKiA0ICsgMl0sIHRoaXMuTVswICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5NWzEgKiA0ICsgMF0sIHRoaXMuTVsxICogNCArIDJdLCB0aGlzLk1bMSAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuTVszICogNCArIDBdLCB0aGlzLk1bMyAqIDQgKyAyXSwgdGhpcy5NWzMgKiA0ICsgM10pIC8gZGV0O1xyXG4gICAgICByLk1bMiAqIDQgKyAyXSA9XHJcbiAgICAgICAgdGhpcy5kZXRlcm0zeDModGhpcy5NWzAgKiA0ICsgMF0sIHRoaXMuTVswICogNCArIDFdLCB0aGlzLk1bMCAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5NWzEgKiA0ICsgMF0sIHRoaXMuTVsxICogNCArIDFdLCB0aGlzLk1bMSAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMF0sIHRoaXMuTVszICogNCArIDFdLCB0aGlzLk1bMyAqIDQgKyAzXSkgLyBkZXQ7XHJcbiAgICAgIHIuTVszICogNCArIDJdID1cclxuICAgICAgICAtdGhpcy5kZXRlcm0zeDModGhpcy5NWzAgKiA0ICsgMF0sIHRoaXMuTVswICogNCArIDFdLCB0aGlzLk1bMCAqIDQgKyAyXSxcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuTVsxICogNCArIDBdLCB0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgMl0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLk1bMyAqIDQgKyAwXSwgdGhpcy5NWzMgKiA0ICsgMV0sIHRoaXMuTVszICogNCArIDJdKSAvIGRldDtcclxuICAgICBcclxuICAgICAgci5NWzAgKiA0ICsgM10gPVxyXG4gICAgICAgIC10aGlzLmRldGVybTN4Myh0aGlzLk1bMCAqIDQgKyAxXSwgdGhpcy5NWzAgKiA0ICsgMl0sIHRoaXMuTVswICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5NWzEgKiA0ICsgMV0sIHRoaXMuTVsxICogNCArIDJdLCB0aGlzLk1bMSAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMiAqIDQgKyAyXSwgdGhpcy5NWzIgKiA0ICsgM10pIC8gZGV0O1xyXG4gICAgICByLk1bMSAqIDQgKyAzXSA9XHJcbiAgICAgICAgdGhpcy5kZXRlcm0zeDModGhpcy5NWzAgKiA0ICsgMF0sIHRoaXMuTVswICogNCArIDJdLCB0aGlzLk1bMCAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5NWzEgKiA0ICsgMF0sIHRoaXMuTVsxICogNCArIDJdLCB0aGlzLk1bMSAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMF0sIHRoaXMuTVsyICogNCArIDJdLCB0aGlzLk1bMiAqIDQgKyAzXSkgLyBkZXQ7XHJcbiAgICAgIHIuTVsyICogNCArIDNdID1cclxuICAgICAgICAtdGhpcy5kZXRlcm0zeDModGhpcy5NWzAgKiA0ICsgMF0sIHRoaXMuTVswICogNCArIDFdLCB0aGlzLk1bMCAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuTVsxICogNCArIDBdLCB0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgM10sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAwXSwgdGhpcy5NWzIgKiA0ICsgMV0sIHRoaXMuTVsyICogNCArIDNdKSAvIGRldDtcclxuICAgICAgci5NWzMgKiA0ICsgM10gPVxyXG4gICAgICAgIHRoaXMuZGV0ZXJtM3gzKHRoaXMuTVswICogNCArIDBdLCB0aGlzLk1bMCAqIDQgKyAxXSwgdGhpcy5NWzAgKiA0ICsgMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuTVsxICogNCArIDBdLCB0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgMl0sXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuTVsyICogNCArIDBdLCB0aGlzLk1bMiAqIDQgKyAxXSwgdGhpcy5NWzIgKiA0ICsgMl0pIC8gZGV0O1xyXG4gICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuICBcclxuICAgIGNvbnN0cnVjdG9yKCBBMDAsIEEwMSwgQTAyLCBBMDMsXHJcbiAgICAgICAgICAgICAgICAgQTEwLCBBMTEsIEExMiwgQTEzLFxyXG4gICAgICAgICAgICAgICAgIEEyMCwgQTIxLCBBMjIsIEEyMyxcclxuICAgICAgICAgICAgICAgICBBMzAsIEEzMSwgQTMyLCBBMzMgKSB7XHJcbiAgICAgIHRoaXMuTSA9IFtBMDAsIEEwMSwgQTAyLCBBMDMsIFxyXG4gICAgICAgICAgIEExMCwgQTExLCBBMTIsIEExMywgXHJcbiAgICAgICAgICAgQTIwLCBBMjEsIEEyMiwgQTIzLFxyXG4gICAgICAgICAgIEEzMCwgQTMxLCBBMzIsIEEzM107XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzdGF0aWMgc2NhbGUoIHMgKSB7XHJcbiAgICAgIHJldHVybiBuZXcgbWF0cihzLngsIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCBzLnksIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAwLCBzLnosIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIGlkZW50aXR5KCkge1xyXG4gICAgICByZXR1cm4gbmV3IG1hdHIoKTtcclxuICAgIH1cclxuICBcclxuICAgIHN0YXRpYyB0cmFuc2xhdGUoIHQgKSB7XHJcbiAgICAgIHJldHVybiBuZXcgbWF0cigxLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgMCwgMSwgMCwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0LngsIHQueSwgdC56LCAxKTtcclxuICAgIH1cclxuICAgICAgXHJcbiAgICBzdGF0aWMgcm90YXRlWCggQSApXHJcbiAgICB7XHJcbiAgICAgIHZhciBzaSA9IE1hdGguc2luKEEpLCBjbyA9IE1hdGguY29zKEEpO1xyXG4gIFxyXG4gICAgICByZXR1cm4gbmV3IG1hdHIoMSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIDAsIGNvLCBzaSwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIDAsIC1zaSwgY28sIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICAgIH1cclxuICBcclxuICAgIHN0YXRpYyByb3RhdGVZKCBBIClcclxuICAgIHtcclxuICAgICAgdmFyIHNpID0gTWF0aC5zaW4oQSksIGNvID0gTWF0aC5jb3MoQSk7XHJcbiAgIFxyXG4gICAgICByZXR1cm4gIG5ldyBtYXRyKGNvLCAwLCAtc2ksIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAxLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2ksIDAsIGNvLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzdGF0aWMgcm90YXRlWiggQSApXHJcbiAgICB7XHJcbiAgICAgIHZhciBzaSA9IE1hdGguc2luKEEpLCBjbyA9IE1hdGguY29zKEEpO1xyXG4gICAgICByZXR1cm4gbmV3IG1hdHIoY28sIHNpLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAtc2ksIGNvLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDEpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgc3RhdGljIHJvdGF0ZSggQSwgViApXHJcbiAgICB7XHJcbiAgICAgIHZhciBzaSA9IE1hdGguc2luKEEpLCBjbyA9IE1hdGguY29zKEEpO1xyXG4gICAgICB2YXIgVjEgPSBWLm5vcm1hbGlzZSgpO1xyXG4gICAgXHJcbiAgICAgIHJldHVybiBuZXcgIG1hdHIoY28gKyBWMS54ICogVjEueCAqICgxIC0gY28pLCBWMS55ICogVjEueCAqICgxIC0gY28pICsgVjEueiAqIHNpLCBWMS56ICogVjEueCAqICgxIC0gY28pIC0gVjEueSAqIHNpLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgVjEueSAqIFYxLnggKiAoMSAtIGNvKSAtIFYxLnogKiBzaSwgY28gKyBWMS55ICogVjEueSAqICgxIC0gY28pLCBWMS55ICogVjEueiAqICgxIC0gY28pICsgVjEueCAqIHNpLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgVjEueiAqIFYxLnggKiAoMSAtIGNvKSArIFYxLnkgKiBzaSwgVjEueiAqIFYxLnkgKiAoMSAtIGNvKSAtIFYxLnggKiBzaSwgY28gKyBWMS56ICogVjEueiAqICgxIC0gY28pLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgMCwgMCwgMCwgMSk7IFxyXG4gICAgfVxyXG4gIFxyXG4gICAgdHJhbnNwb3NlKCkge1xyXG4gICAgICByZXR1cm4gbmV3IG1hdHIodGhpcy5NWzAgKiA0ICsgMF0sIHRoaXMuTVsxICogNCArIDBdLCB0aGlzLk1bMiAqIDQgKyAwXSwgdGhpcy5NWzMgKiA0ICsgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMCAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgMV0sIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMyAqIDQgKyAxXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTVswICogNCArIDJdLCB0aGlzLk1bMSAqIDQgKyAyXSwgdGhpcy5NWzIgKiA0ICsgMl0sIHRoaXMuTVszICogNCArIDJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzAgKiA0ICsgM10sIHRoaXMuTVsxICogNCArIDNdLCB0aGlzLk1bMiAqIDQgKyAzXSwgdGhpcy5NWzMgKiA0ICsgM10pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZGV0ZXJtM3gzKEExMSwgQTEyLCBBMTMsXHJcbiAgICAgICAgICAgICAgQTIxLCBBMjIsIEEyMyxcclxuICAgICAgICAgICAgICBBMzEsIEEzMiwgQTMzKSB7XHJcbiAgICAgIHJldHVybiBBMTEgKiBBMjIgKiBBMzMgKyBBMTIgKiBBMjMgKiBBMzEgKyBBMTMgKiBBMjEgKiBBMzIgLVxyXG4gICAgICAgICAgICAgQTExICogQTIzICogQTMyIC0gQTEyICogQTIxICogQTMzIC0gQTEzICogQTIyICogQTMxO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgbGVuZ3RoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5NWzAgKiA0ICsgMF0gKiB0aGlzLmRldGVybTN4Myh0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgMl0sIHRoaXMuTVsxICogNCArIDNdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMV0sIHRoaXMuTVsyICogNCArIDJdLCB0aGlzLk1bMiAqIDQgKyAzXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTVszICogNCArIDFdLCB0aGlzLk1bMyAqIDQgKyAyXSwgdGhpcy5NWzMgKiA0ICsgM10pICtcclxuICAgICAgICAgICAgLXRoaXMuTVswICogNCArIDFdICogdGhpcy5kZXRlcm0zeDModGhpcy5NWzEgKiA0ICsgMF0sIHRoaXMuTVsxICogNCArIDJdLCB0aGlzLk1bMSAqIDQgKyAzXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTVsyICogNCArIDBdLCB0aGlzLk1bMiAqIDQgKyAyXSwgdGhpcy5NWzIgKiA0ICsgM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMyAqIDQgKyAwXSwgdGhpcy5NWzMgKiA0ICsgMl0sIHRoaXMuTVszICogNCArIDNdKSArXHJcbiAgICAgICAgICAgICt0aGlzLk1bMCAqIDQgKyAyXSAqIHRoaXMuZGV0ZXJtM3gzKHRoaXMuTVsxICogNCArIDBdLCB0aGlzLk1bMSAqIDQgKyAxXSwgdGhpcy5NWzEgKiA0ICsgM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAwXSwgdGhpcy5NWzIgKiA0ICsgMV0sIHRoaXMuTVsyICogNCArIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMF0sIHRoaXMuTVszICogNCArIDFdLCB0aGlzLk1bMyAqIDQgKyAzXSkgK1xyXG4gICAgICAgICAgICAtdGhpcy5NWzAgKiA0ICsgM10gKiB0aGlzLmRldGVybTN4Myh0aGlzLk1bMSAqIDQgKyAwXSwgdGhpcy5NWzEgKiA0ICsgMV0sIHRoaXMuTVsxICogNCArIDJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMF0sIHRoaXMuTVsyICogNCArIDFdLCB0aGlzLk1bMiAqIDQgKyAyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTVszICogNCArIDBdLCB0aGlzLk1bMyAqIDQgKyAxXSwgdGhpcy5NWzMgKiA0ICsgMl0pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgbXVsKCBNMiApXHJcbiAgICB7XHJcbiAgICAgIHZhciByZXMgPSBuZXcgbWF0cigpO1xyXG4gICAgXHJcbiAgICAgIHJlcy5NWzAgKiA0ICsgMF0gPSB0aGlzLk1bMCAqIDQgKyAwXSAqIE0yLk1bMCAqIDQgKyAwXSArIHRoaXMuTVswICogNCArIDFdICogTTIuTVsxICogNCArIDBdICsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzAgKiA0ICsgMl0gKiBNMi5NWzIgKiA0ICsgMF0gKyB0aGlzLk1bMCAqIDQgKyAzXSAqIE0yLk1bMyAqIDQgKyAwXTtcclxuICAgICAgcmVzLk1bMCAqIDQgKyAxXSA9IHRoaXMuTVswICogNCArIDBdICogTTIuTVswICogNCArIDFdICsgdGhpcy5NWzAgKiA0ICsgMV0gKiBNMi5NWzEgKiA0ICsgMV0gKyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMCAqIDQgKyAyXSAqIE0yLk1bMiAqIDQgKyAxXSArIHRoaXMuTVswICogNCArIDNdICogTTIuTVszICogNCArIDFdO1xyXG4gICAgICByZXMuTVswICogNCArIDJdID0gdGhpcy5NWzAgKiA0ICsgMF0gKiBNMi5NWzAgKiA0ICsgMl0gKyB0aGlzLk1bMCAqIDQgKyAxXSAqIE0yLk1bMSAqIDQgKyAyXSArIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTVswICogNCArIDJdICogTTIuTVsyICogNCArIDJdICsgdGhpcy5NWzAgKiA0ICsgM10gKiBNMi5NWzMgKiA0ICsgMl07XHJcbiAgICAgIHJlcy5NWzAgKiA0ICsgM10gPSB0aGlzLk1bMCAqIDQgKyAwXSAqIE0yLk1bMCAqIDQgKyAzXSArIHRoaXMuTVswICogNCArIDFdICogTTIuTVsxICogNCArIDNdICsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzAgKiA0ICsgMl0gKiBNMi5NWzIgKiA0ICsgM10gKyB0aGlzLk1bMCAqIDQgKyAzXSAqIE0yLk1bMyAqIDQgKyAzXTtcclxuXHRcdFx0XHRcdFxyXG4gICAgICByZXMuTVsxICogNCArIDBdID0gdGhpcy5NWzEgKiA0ICsgMF0gKiBNMi5NWzAgKiA0ICsgMF0gKyB0aGlzLk1bMSAqIDQgKyAxXSAqIE0yLk1bMSAqIDQgKyAwXSArIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTVsxICogNCArIDJdICogTTIuTVsyICogNCArIDBdICsgdGhpcy5NWzEgKiA0ICsgM10gKiBNMi5NWzMgKiA0ICsgMF07XHJcbiAgICAgIHJlcy5NWzEgKiA0ICsgMV0gPSB0aGlzLk1bMSAqIDQgKyAwXSAqIE0yLk1bMCAqIDQgKyAxXSArIHRoaXMuTVsxICogNCArIDFdICogTTIuTVsxICogNCArIDFdICsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzEgKiA0ICsgMl0gKiBNMi5NWzIgKiA0ICsgMV0gKyB0aGlzLk1bMSAqIDQgKyAzXSAqIE0yLk1bMyAqIDQgKyAxXTtcclxuICAgICAgcmVzLk1bMSAqIDQgKyAyXSA9IHRoaXMuTVsxICogNCArIDBdICogTTIuTVswICogNCArIDJdICsgdGhpcy5NWzEgKiA0ICsgMV0gKiBNMi5NWzEgKiA0ICsgMl0gKyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMSAqIDQgKyAyXSAqIE0yLk1bMiAqIDQgKyAyXSArIHRoaXMuTVsxICogNCArIDNdICogTTIuTVszICogNCArIDJdO1xyXG4gICAgICByZXMuTVsxICogNCArIDNdID0gdGhpcy5NWzEgKiA0ICsgMF0gKiBNMi5NWzAgKiA0ICsgM10gKyB0aGlzLk1bMSAqIDQgKyAxXSAqIE0yLk1bMSAqIDQgKyAzXSArIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTVsxICogNCArIDJdICogTTIuTVsyICogNCArIDNdICsgdGhpcy5NWzEgKiA0ICsgM10gKiBNMi5NWzMgKiA0ICsgM107XHJcblx0XHRcdFx0XHRcclxuICAgICAgcmVzLk1bMiAqIDQgKyAwXSA9IHRoaXMuTVsyICogNCArIDBdICogTTIuTVswICogNCArIDBdICsgdGhpcy5NWzIgKiA0ICsgMV0gKiBNMi5NWzEgKiA0ICsgMF0gKyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAyXSAqIE0yLk1bMiAqIDQgKyAwXSArIHRoaXMuTVsyICogNCArIDNdICogTTIuTVszICogNCArIDBdO1xyXG4gICAgICByZXMuTVsyICogNCArIDFdID0gdGhpcy5NWzIgKiA0ICsgMF0gKiBNMi5NWzAgKiA0ICsgMV0gKyB0aGlzLk1bMiAqIDQgKyAxXSAqIE0yLk1bMSAqIDQgKyAxXSArIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTVsyICogNCArIDJdICogTTIuTVsyICogNCArIDFdICsgdGhpcy5NWzIgKiA0ICsgM10gKiBNMi5NWzMgKiA0ICsgMV07XHJcbiAgICAgIHJlcy5NWzIgKiA0ICsgMl0gPSB0aGlzLk1bMiAqIDQgKyAwXSAqIE0yLk1bMCAqIDQgKyAyXSArIHRoaXMuTVsyICogNCArIDFdICogTTIuTVsxICogNCArIDJdICsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzIgKiA0ICsgMl0gKiBNMi5NWzIgKiA0ICsgMl0gKyB0aGlzLk1bMiAqIDQgKyAzXSAqIE0yLk1bMyAqIDQgKyAyXTtcclxuICAgICAgcmVzLk1bMiAqIDQgKyAzXSA9IHRoaXMuTVsyICogNCArIDBdICogTTIuTVswICogNCArIDNdICsgdGhpcy5NWzIgKiA0ICsgMV0gKiBNMi5NWzEgKiA0ICsgM10gKyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMiAqIDQgKyAyXSAqIE0yLk1bMiAqIDQgKyAzXSArIHRoaXMuTVsyICogNCArIDNdICogTTIuTVszICogNCArIDNdO1xyXG5cdFx0XHRcdFx0XHJcbiAgICAgIHJlcy5NWzMgKiA0ICsgMF0gPSB0aGlzLk1bMyAqIDQgKyAwXSAqIE0yLk1bMCAqIDQgKyAwXSArIHRoaXMuTVszICogNCArIDFdICogTTIuTVsxICogNCArIDBdICsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMl0gKiBNMi5NWzIgKiA0ICsgMF0gKyB0aGlzLk1bMyAqIDQgKyAzXSAqIE0yLk1bMyAqIDQgKyAwXTtcclxuICAgICAgcmVzLk1bMyAqIDQgKyAxXSA9IHRoaXMuTVszICogNCArIDBdICogTTIuTVswICogNCArIDFdICsgdGhpcy5NWzMgKiA0ICsgMV0gKiBNMi5NWzEgKiA0ICsgMV0gKyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1bMyAqIDQgKyAyXSAqIE0yLk1bMiAqIDQgKyAxXSArIHRoaXMuTVszICogNCArIDNdICogTTIuTVszICogNCArIDFdO1xyXG4gICAgICByZXMuTVszICogNCArIDJdID0gdGhpcy5NWzMgKiA0ICsgMF0gKiBNMi5NWzAgKiA0ICsgMl0gKyB0aGlzLk1bMyAqIDQgKyAxXSAqIE0yLk1bMSAqIDQgKyAyXSArIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTVszICogNCArIDJdICogTTIuTVsyICogNCArIDJdICsgdGhpcy5NWzMgKiA0ICsgM10gKiBNMi5NWzMgKiA0ICsgMl07XHJcbiAgICAgIHJlcy5NWzMgKiA0ICsgM10gPSB0aGlzLk1bMyAqIDQgKyAwXSAqIE0yLk1bMCAqIDQgKyAzXSArIHRoaXMuTVszICogNCArIDFdICogTTIuTVsxICogNCArIDNdICsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NWzMgKiA0ICsgMl0gKiBNMi5NWzIgKiA0ICsgM10gKyB0aGlzLk1bMyAqIDQgKyAzXSAqIE0yLk1bMyAqIDQgKyAzXTtcclxuICBcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICBcclxuICAgIHN0YXRpYyB2aWV3KCBMb2MsIEF0LCBVcDEgKVxyXG4gICAge1xyXG4gICAgICB2YXIgRGlyID0gQXQuc3ViKExvYykubm9ybWFsaXNlKCk7XHJcbiAgICAgIHZhciBSaWdodCA9IChEaXIuY3Jvc3MoVXAxKSkubm9ybWFsaXNlKCk7XHJcbiAgICAgIHZhciBVcCA9IFJpZ2h0LmNyb3NzKERpcik7XHJcbiAgICBcclxuICAgICAgcmV0dXJuIG5ldyBtYXRyKFJpZ2h0LngsIFVwLngsIC1EaXIueCwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIFJpZ2h0LnksIFVwLnksIC1EaXIueSwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIFJpZ2h0LnosIFVwLnosIC1EaXIueiwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgIC0oTG9jLnNjYWxhck11bChSaWdodCkpLCAtKExvYy5zY2FsYXJNdWwoVXApKSwgKExvYy5zY2FsYXJNdWwoRGlyKSksIDEpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgc3RhdGljIG9ydGhvKCBMZWZ0LCBSaWdodCwgQm90dG9tLCBUb3AsIE5lYXIsIEZhciApXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiBuZXcgbWF0cigyIC8gKFJpZ2h0IC0gTGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAyIC8gKFRvcCAtIEJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAwLCAyIC8gKE5lYXIgLSBGYXIpLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKFJpZ2h0ICsgTGVmdCkgLyAoTGVmdCAtIFJpZ2h0KSwgKFRvcCArIEJvdHRvbSkgLyAoQm90dG9tIC0gVG9wKSwgKEZhciArIE5lYXIpIC8gKE5lYXIgLSBGYXIpLCAxKTtcclxuICAgIH1cclxuICBcclxuICAgIHN0YXRpYyBmcnVzdHVtKCBMZWZ0LCBSaWdodCwgQm90dG9tLCBUb3AsIE5lYXIsIEZhciApIHtcclxuICAgICAgcmV0dXJuIG5ldyBtYXRyKDIgKiBOZWFyIC8gKFJpZ2h0IC0gTGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAyICogTmVhciAvIChUb3AgLSBCb3R0b20pLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKFJpZ2h0ICsgTGVmdCkgLyAoUmlnaHQgLSBMZWZ0KSwgKFRvcCArIEJvdHRvbSkgLyAoVG9wIC0gQm90dG9tKSxcclxuICAgICAgICAgICAgICAgICAgICAgIChGYXIgKyBOZWFyKSAvIChOZWFyIC0gRmFyKSwgLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAwLCAwLCAyICogTmVhciAqIEZhciAvIChOZWFyIC0gRmFyKSwgMCk7XHJcbiAgICB9XHJcbn0iLCIvL2ltcG9ydCBQYXJzZSBmcm9tICcuLi9ub2RlX21vZHVsZXMvcGFyc2UvZGlzdC9wYXJzZS5taW4uanMnO1xyXG4vL2ltcG9ydCBQTkcgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3BuZ2pzL2Jyb3dzZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHR1cmUge1xyXG4gICAgc2FtcGxlcjtcclxuICAgIHRleHR1cmU7XHJcbiAgICB3O1xyXG4gICAgaDtcclxuICAgIGlzUmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvckJ5QXJyYXlMb3coIHJuZCwgdywgaCwgbGV2ZWwsIGludGVybmFsRm9ybWF0LCBib3JkZXIsIGZvcm1hdCwgdHlwZSwgYml0cyApIHtcclxuICAgICAgICB0aGlzLnRleHR1cmUgPSBybmQuZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICAgICAgdGhpcy5oID0gaDtcclxuICAgICAgICBcclxuICAgICAgICBybmQuZ2wuYmluZFRleHR1cmUocm5kLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSk7XHJcblxyXG4gICAgICAgIHJuZC5nbC50ZXhJbWFnZTJEKFxyXG4gICAgICAgICAgICBybmQuZ2wuVEVYVFVSRV8yRCxcclxuICAgICAgICAgICAgbGV2ZWwsICAgICAgICAgICAgLy8gbWlwIGxldmVsXHJcbiAgICAgICAgICAgIGludGVybmFsRm9ybWF0LCAgLy8gaW50ZXJuYWwgZm9ybWF0XHJcbiAgICAgICAgICAgIHcsICAgICAgICAgICAgLy8gd2lkdGhcclxuICAgICAgICAgICAgaCwgICAgICAgICAgICAvLyBoZWlnaHRcclxuICAgICAgICAgICAgYm9yZGVyLCAgICAgICAgICAgIC8vIGJvcmRlclxyXG4gICAgICAgICAgICBmb3JtYXQsICAvLyBmb3JtYXRcclxuICAgICAgICAgICAgdHlwZSwgLy8gdHlwZVxyXG4gICAgICAgICAgICBiaXRzKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3JCeUFycmF5KCBybmQsIHcsIGgsIGJpdHMgKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvckJ5QXJyYXlMb3coXHJcbiAgICAgICAgICAgIHJuZCwgdywgaCxcclxuICAgICAgICAgICAgMCwgICAgICAgICAgICAvLyBtaXAgbGV2ZWxcclxuICAgICAgICAgICAgcm5kLmdsLlJHQkEsICAvLyBpbnRlcm5hbCBmb3JtYXRcclxuICAgICAgICAgICAgMCwgICAgICAgICAgICAvLyBib3JkZXJcclxuICAgICAgICAgICAgcm5kLmdsLlJHQkEsICAvLyBmb3JtYXRcclxuICAgICAgICAgICAgcm5kLmdsLlVOU0lHTkVEX0JZVEUsIC8vIHR5cGVcclxuICAgICAgICAgICAgYml0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFyYW1zKCBybmQsIHBhcmFtcyApIHtcclxuICAgICAgICBybmQuZ2wuYmluZFRleHR1cmUocm5kLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSk7XHJcblxyXG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKChwYXJhbSk9PntcclxuICAgICAgICAgICAgcm5kLmdsLnNhbXBsZXJQYXJhbWV0ZXJpKHRoaXMuc2FtcGxlciwgcGFyYW1bMF0sIHBhcmFtWzFdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvckZyb21GaWxlKCBybmQsIGZpbGVOYW1lICkge1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gXCIuLi9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yQnlBcnJheShybmQsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgaW1nKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvciggcm5kLCAuLi5hcmdzICkge1xyXG4gICAgICAgIHN3aXRjaChhcmdzLmxlbmd0aCkge1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvckZyb21GaWxlKHJuZCwgYXJnc1swXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvckJ5QXJyYXkocm5kLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yQnlBcnJheUxvdyhybmQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0sIGFyZ3NbN10pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2FtcGxlciA9IHJuZC5nbC5jcmVhdGVTYW1wbGVyKCk7XHJcbiAgICAgICAgLy9ybmQuZ2wuc2FtcGxlclBhcmFtZXRlcmkodGhpcy5zYW1wbGVyLCBybmQuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBybmQuZ2wuTElORUFSKTtcclxuICAgICAgICB0aGlzLnNldFBhcmFtcyhybmQsIFtcclxuICAgICAgICAgICAgW3JuZC5nbC5URVhUVVJFX01JTl9GSUxURVIsIHJuZC5nbC5MSU5FQVJdLFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZCggcm5kLCB0ZXhVbml0ICkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcclxuICAgICAgICAgICAgcm5kLmdsLmFjdGl2ZVRleHR1cmUocm5kLmdsLlRFWFRVUkUwICsgdGV4VW5pdCk7XHJcbiAgICAgICAgICAgIHJuZC5nbC5iaW5kVGV4dHVyZShybmQuZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoIHJuZCwgc2hhZGVyLCBzYW1wbGVyTmFtZSwgdGV4VW5pdCApIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgICAgICAgIHJuZC5nbC5hY3RpdmVUZXh0dXJlKHJuZC5nbC5URVhUVVJFMCArIHRleFVuaXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBybmQuZ2wuYmluZFRleHR1cmUocm5kLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZW5kIHVuaXQgdG8gdW5pZm9ybVxyXG5cclxuICAgICAgICAgICAgdmFyIHNhbXBsZXJMb2MgPSBybmQuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlci5wcm9ncmFtLCBzYW1wbGVyTmFtZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2FtcGxlckxvYyA9PSB1bmRlZmluZWQgfHwgc2FtcGxlckxvYyA9PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRlVDS0lORyBURVhUVVJFIENBTidUIEZJTkQgSVQnUyBGVUNLSU5HIFNBTVBMRVJcIik7XHJcblxyXG4gICAgICAgICAgICBybmQuZ2wudW5pZm9ybTFpKHNhbXBsZXJMb2MsIHRleFVuaXQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm5kLmdsLmJpbmRTYW1wbGVyKHRleFVuaXQsIHRoaXMuc2FtcGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtUZXh0dXJlfSBmcm9tIFwiLi90ZXh0dXJlLmpzXCI7XHJcblxyXG4vKiBCaW5kaW5nc1xyXG4wIC0gbWF0ZXJpYWxcclxuMSAtIGNhbWVyYVxyXG4yIC0gdGVzdCBcclxuMyAtIHNsaWRlcnMgXHJcbjQgLSBsaWdodHNcclxuKi9cclxuZXhwb3J0IGNsYXNzIFVibyB7XHJcbiAgICBidWY7XHJcbiAgICBiaW5kaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBybmQsIHNpemUsIG5ld0JpbmRpbmcsIGRhdGEgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmJ1ZiA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgcm5kLmdsLmJpbmRCdWZmZXIocm5kLmdsLlVOSUZPUk1fQlVGRkVSLCB0aGlzLmJ1Zik7XHJcbiAgICAgICAgcm5kLmdsLmJ1ZmZlckRhdGEocm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBzaXplLCBybmQuZ2wuRFlOQU1JQ19EUkFXKTtcclxuICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlcihybmQuZ2wuVU5JRk9STV9CVUZGRVIsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuYmluZGluZyA9IG5ld0JpbmRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0KCBybmQsIGRhdGEgKVxyXG4gICAge1xyXG4gICAgICAgIHJuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5VTklGT1JNX0JVRkZFUiwgdGhpcy5idWYpO1xyXG4gICAgICAgIHJuZC5nbC5idWZmZXJTdWJEYXRhKHJuZC5nbC5VTklGT1JNX0JVRkZFUiwgMCwgZGF0YSk7XHJcbiAgICAgICAgcm5kLmdsLmJpbmRCdWZmZXIocm5kLmdsLlVOSUZPUk1fQlVGRkVSLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKCBybmQsIHNoYWRlciwgbmFtZSApIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBybmQuZ2wuZ2V0VW5pZm9ybUJsb2NrSW5kZXgoc2hhZGVyLnByb2dyYW0sIG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSAmJiBpbmRleCAhPSA0Mjk0OTY3Mjk1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm5kLmdsLnVuaWZvcm1CbG9ja0JpbmRpbmcoc2hhZGVyLnByb2dyYW0sIGluZGV4LCB0aGlzLmJpbmRpbmcpO1xyXG4gICAgICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlckJhc2Uocm5kLmdsLlVOSUZPUk1fQlVGRkVSLCB0aGlzLmJpbmRpbmcsIHRoaXMuYnVmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9lbHNlIGNvbnNvbGUubG9nKFwiRlVDSzogY2FuJ3QgYmluZCB0byBcIiArIG5hbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL3ZhciBtdGxMaWIgPSBbXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XHJcbiAgICB1Ym87XHJcbiAgICBLYTtcclxuICAgIEtkO1xyXG4gICAgS3M7XHJcbiAgICBQaDtcclxuICAgIFRyYW5zO1xyXG5cclxuICAgIHRleEtkO1xyXG4gICAgdGV4S3M7XHJcbiAgICB0ZXhOO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yRW1wdHkoKSB7XHJcbiAgICAgICAgdGhpcy5LYSA9IFswLjA1LCAwLjEsIDAuMiwgMV07XHJcbiAgICAgICAgdGhpcy5LZCA9IFswLjQsIDAuNSwgMC4zXSxcclxuICAgICAgICB0aGlzLktzID0gWzAuNCwgMC41LCAwLjNdO1xyXG4gICAgICAgIHRoaXMuUGggPSAxO1xyXG4gICAgICAgIHRoaXMuVHJhbnMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yV2l0aFBhcmFtcyggbmV3S2EsIG5ld0tkLCBuZXdLcywgbmV3UGgsIG5ld1RyYW5zICkge1xyXG4gICAgICAgIHRoaXMuS2EgPSBuZXdLYTtcclxuICAgICAgICB0aGlzLktkID0gbmV3S2Q7XHJcbiAgICAgICAgdGhpcy5LcyA9IG5ld0tzO1xyXG4gICAgICAgIHRoaXMuUGggPSBuZXdQaDtcclxuICAgICAgICB0aGlzLlRyYW5zID0gbmV3VHJhbnM7XHJcbiAgICAgICAgLy90aGlzLnRleEtkID0gbmV3VGV4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvciggcm5kLCAuLi5hcmdzICkge1xyXG4gICAgICAgIHRoaXMudWJvID0gbmV3IFVibyhybmQsIDQgKiA0ICogMywgMCk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvckVtcHR5KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvcldpdGhQYXJhbXMoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldE10bEFycmF5KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KHRoaXMuS2EuY29uY2F0KHRoaXMuS2QpLmNvbmNhdCh0aGlzLlRyYW5zKS5jb25jYXQodGhpcy5LcykuY29uY2F0KHRoaXMuUGgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXBwbHkoIHJuZCwgc2hhZGVyIClcclxuICAgIHtcclxuICAgICAgICAvLyBNYXRlcmlhbCB1Ym9cclxuICAgICAgICB0aGlzLnViby5iaW5kKHJuZCwgc2hhZGVyLCBcIm10bFwiKTtcclxuICAgICAgICB0aGlzLnViby5zdWJtaXQocm5kLCB0aGlzLmdldE10bEFycmF5KCkpO1xyXG5cclxuICAgICAgICAvLyBUZXh0dXJpZXNcclxuICAgICAgICBpZiAodGhpcy50ZXhLZCAhPSB1bmRlZmluZWQgJiYgdGhpcy50ZXhLZC5pc1JlYWR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm5kLmdsLnVuaWZvcm0xaShybmQuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlci5wcm9ncmFtLCBcImlzVGV4S2RcIiksIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnRleEtkLmJpbmQocm5kLCBzaGFkZXIsIFwidGV4S2RcIiwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcm5kLmdsLnVuaWZvcm0xaShybmQuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlci5wcm9ncmFtLCBcImlzVGV4S2RcIiksIDApO1xyXG4gICAgICAgIGlmICh0aGlzLnRleEtzICE9IHVuZGVmaW5lZCAmJiB0aGlzLnRleEtzLmlzUmVhZHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBybmQuZ2wudW5pZm9ybTFpKHJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyLnByb2dyYW0sIFwiaXNUZXhLc1wiKSwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4S3MuYmluZChybmQsIHNoYWRlciwgXCJ0ZXhLc1wiLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBybmQuZ2wudW5pZm9ybTFpKHJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyLnByb2dyYW0sIFwiaXNUZXhLc1wiKSwgMCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4TiAhPSB1bmRlZmluZWQgJiYgdGhpcy50ZXhOLmlzUmVhZHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBybmQuZ2wudW5pZm9ybTFpKHJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyLnByb2dyYW0sIFwiaXNUZXhOXCIpLCAxKTtcclxuICAgICAgICAgICAgdGhpcy50ZXhOLmJpbmQocm5kLCBzaGFkZXIsIFwidGV4TlwiLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBybmQuZ2wudW5pZm9ybTFpKHJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyLnByb2dyYW0sIFwiaXNUZXhOXCIpLCAwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkVG9NdGxMaWIoIHJuZCwgbmFtZSwgbXRsICkge1xyXG4gICAgICAgIGlmIChybmQubXRsTGliW25hbWVdID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcm5kLm10bExpYltuYW1lXSA9IG10bDtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhcHBseUZyb21MaWIoIHJuZCwgc2hhZGVyLCBuYW1lIClcclxuICAgIHtcclxuICAgICAgICBpZiAocm5kLm10bExpYltuYW1lXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJuZC5tdGxMaWJbbmFtZV0uYXBwbHkocm5kLCBzaGFkZXIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcm5kLm10bExpYlsnZGVmJ10uYXBwbHkocm5kLCBzaGFkZXIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgbG9hZE10bHMoIHJuZCwgZmlsZU5hbWUgKSB7XHJcbiAgICAgICAgdmFyIHBhdGhBID0gZmlsZU5hbWUuc3BsaXQoJy8nKSxcclxuICAgICAgICAgICAgcGF0aCA9IGZpbGVOYW1lLnJlcGxhY2UocGF0aEFbcGF0aEEubGVuZ3RoIC0gMV0sICcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGZpbGVOYW1lICsgJz8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpKS50aGVuKChyZXMpPT57IHJldHVybiByZXMudGV4dCgpOyB9KS50aGVuKCh0ZXh0KT0+e1xyXG4gICAgICAgICAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcclxuICAgICAgICAgICAgdmFyIG91dE10bHMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGN1ck10bE5hbWUgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgS2EgPSBbMC44NywgMCwgMC44N10sXHJcbiAgICAgICAgICAgICAgICBLZCA9IFswLjg3LCAwLCAwLjg3XSxcclxuICAgICAgICAgICAgICAgIEtzID0gWzAuODcsIDAsIDAuODddLFxyXG4gICAgICAgICAgICAgICAgUGggPSAxLFxyXG4gICAgICAgICAgICAgICAgVHJhbnMgPSAxLFxyXG4gICAgICAgICAgICAgICAgdGV4S2QsXHJcbiAgICAgICAgICAgICAgICB0ZXhLcyxcclxuICAgICAgICAgICAgICAgIHRleE47XHJcbiAgICAgICAgICAgIGxpbmVzLmZvckVhY2goKGxpbmUpPT57XHJcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKCdcXHInLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmRzID0gbGluZS5zcGxpdCgnICcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3b3Jkcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAod29yZHNbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25ld210bCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJNdGxOYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dE10bHNbY3VyTXRsTmFtZV0gPSBuZXcgTWF0ZXJpYWwocm5kLCBLYSwgS2QsIEtzLCBQaCwgVHJhbnMpOyAvLyBTdWJtaXQgbXRsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRNdGxzW2N1ck10bE5hbWVdLnRleEtkID0gdGV4S2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRNdGxzW2N1ck10bE5hbWVdLnRleEtzID0gdGV4S3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRNdGxzW2N1ck10bE5hbWVdLnRleE4gPSB0ZXhOO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck10bE5hbWUgPSB3b3Jkc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4S2QgPSB0ZXhLcyA9IHRleE4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0thJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgS2EgPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKSwgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0tkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgS2QgPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0tzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgS3MgPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21hcF9LZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleEtkID0gbmV3IFRleHR1cmUocm5kLCBwYXRoICsgd29yZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdtYXBfS3MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXhLcyA9IG5ldyBUZXh0dXJlKHJuZCwgcGF0aCArIHdvcmRzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWFwX04nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0RW5jb2RlclN0cmVhbSA9IG5ldyBUZXh0dXJlKHJuZCwgcGF0aCArIHdvcmRzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY3VyTXRsTmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRNdGxzW2N1ck10bE5hbWVdID0gbmV3IE1hdGVyaWFsKHJuZCwgS2EsIEtkLCBLcywgUGgsIFRyYW5zKTsgLy8gU3VibWl0IG10bFxyXG4gICAgICAgICAgICAgICAgb3V0TXRsc1tjdXJNdGxOYW1lXS50ZXhLZCA9IHRleEtkO1xyXG4gICAgICAgICAgICAgICAgb3V0TXRsc1tjdXJNdGxOYW1lXS50ZXhLcyA9IHRleEtzO1xyXG4gICAgICAgICAgICAgICAgb3V0TXRsc1tjdXJNdGxOYW1lXS50ZXhOID0gdGV4TjtcclxuICAgICAgICAgICAgICAgIC8vdGV4S2QgPSB0ZXhLcyA9IHRleE4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGVsZW0gaW4gb3V0TXRscylcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9NdGxMaWIocm5kLCBlbGVtLCBvdXRNdGxzW2VsZW1dKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTaGFkZXIge1xyXG4gICAgcHJvZ3JhbTtcclxuICAgIG5hbWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGxvYWRTaGFkZXJQYXJ0KCBybmQsIHR5cGUsIGRpck5hbWUgKSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQ7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSBybmQuZ2wuVkVSVEVYX1NIQURFUilcclxuICAgICAgICAgICAgcmVzdWx0ID0gZmV0Y2goJy4vc2hhZGVycy8nICsgZGlyTmFtZSArICcvdmVydC5nbHNsPycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkpLnRoZW4oKHJlcyk9PntyZXR1cm4gcmVzLnRleHQoKTt9KS50aGVuKCh0ZXh0KT0+e3NvdXJjZSA9IHRleHQ7fSk7XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gcm5kLmdsLkZSQUdNRU5UX1NIQURFUilcclxuICAgICAgICAgICAgcmVzdWx0ID0gZmV0Y2goJy4vc2hhZGVycy8nICsgZGlyTmFtZSArICcvZnJhZy5nbHNsPycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkpLnRoZW4oKHJlcyk9PntyZXR1cm4gcmVzLnRleHQoKTt9KS50aGVuKCh0ZXh0KT0+e3NvdXJjZSA9IHRleHQ7fSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBzaGFkZXIgPSBybmQuZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHJuZC5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBybmQuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgICAgICAgICBpZiAoIXJuZC5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBybmQuZ2wuQ09NUElMRV9TVEFUVVMpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNIQURFUiBQT09QRUQgLT4gXCIgKyBybmQuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcclxuICAgICAgICAgICAgICAgICBhbGVydChcIkZVQ0tJTkcgU0hBREVSIEZVQ0tFRCBVUFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHNoYWRlcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkU2hhZGVyKCBybmQsIG5ld05hbWUgKSB7XHJcbiAgICAgICAgdmFyIHZfc2hhZGVyO1xyXG4gICAgICAgIHZhciBmX3NoYWRlcjtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmV3TmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gcm5kLmdsLmNyZWF0ZVByb2dyYW0oKTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFByb21pc2UuYWxsKFtTaGFkZXIubG9hZFNoYWRlclBhcnQocm5kLCBybmQuZ2wuVkVSVEVYX1NIQURFUiwgICB0aGlzLm5hbWUpLnRoZW4oKHNoYWRlcik9Pnt2X3NoYWRlciA9IHNoYWRlcn0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2hhZGVyLmxvYWRTaGFkZXJQYXJ0KHJuZCwgcm5kLmdsLkZSQUdNRU5UX1NIQURFUiwgdGhpcy5uYW1lKS50aGVuKChzaGFkZXIpPT57Zl9zaGFkZXIgPSBzaGFkZXJ9KV0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oKCk9PntcclxuICAgICAgICAgICAgcm5kLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHZfc2hhZGVyKTtcclxuICAgICAgICAgICAgcm5kLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIGZfc2hhZGVyKTtcclxuICAgICAgICAgICAgcm5kLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXJuZC5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgcm5kLmdsLkxJTktfU1RBVFVTKSlcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiT09IIEZVQ0tcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1c2UoIHJuZCApIHtcclxuICAgICAgICBybmQuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZlcnRleCB7XHJcbiAgICBwOyAvLyBwb3NcclxuICAgIG47IC8vIG5vcm1hbFxyXG4gICAgdDsgLy8gdGV4dHVyZSBjb29yZFxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvciggbmV3UCwgbmV3TiwgbmV3VCApIHtcclxuICAgICAgICB0aGlzLnAgPSBuZXdQO1xyXG4gICAgICAgIHRoaXMubiA9IG5ld047XHJcbiAgICAgICAgdGhpcy50ID0gbmV3VDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcExlbigpIHtcclxuICAgICAgICByZXR1cm4gNDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbkxlbigpIHtcclxuICAgICAgICByZXR1cm4gNDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdExlbigpIHtcclxuICAgICAgICByZXR1cm4gMjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGxlbigpIHtcclxuICAgICAgICByZXR1cm4gVmVydGV4LnBMZW4oKSArIFZlcnRleC5uTGVuKCkgKyBWZXJ0ZXgudExlbigpO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgY2xhc3MgVG9wb2xvZ3kge1xyXG4gICAgdmVydGV4ZXNBO1xyXG4gICAgaW5kZXhlc0E7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIG5ld1ZzLCBuZXdJbmRleGVzQSwgbmV3SXNWZXJ0ZXhlc0EgPSAwICkge1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXNBID0gbmV3VnM7XHJcbiAgICAgICAgdGhpcy5pbmRleGVzQSA9IG5ld0luZGV4ZXNBO1xyXG4gICAgICAgIHRoaXMuaXNWZXJ0ZXhlc0EgPSBuZXdJc1ZlcnRleGVzQTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3NBcnJheSgpIHtcclxuICAgICAgICB2YXIgb3V0UG9zQTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLlZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBvdXRQb3NBW2ldID0gdmVydGV4ZXNBW2ldLnA7XHJcbiAgICAgICAgcmV0dXJuIG91dFBvc0E7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9ybWFsQXJyYXkoKSB7XHJcbiAgICAgICAgdmFyIG91dE5BO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuVmVydGV4ZXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIG91dE5BW2ldID0gdmVydGV4ZXNBW2ldLm47XHJcbiAgICAgICAgcmV0dXJuIG91dE5BO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRUZXhBcnJheSgpIHtcclxuICAgICAgICB2YXIgb3V0VGV4QTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLlZlcnRleGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBvdXRUZXh0QVtpXSA9IHZlcnRleGVzQVtpXS50O1xyXG4gICAgICAgIHJldHVybiBvdXRUZXh0QTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHNldEJ5UG9zQXJyYXlBbmRDb2xvciggcG9zQSwgbmV3SW5kZXhlc0EgKSB7XHJcbiAgICAgICAgdmFyIG5ld1QgPSBuZXcgVG9wb2xvZ3koW10sIFtdKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NBLmxlbmd0aCAvIDQ7IGkrKylcclxuICAgICAgICAgICAgbmV3VC52ZXJ0ZXhlc0FbaV0gPSBuZXcgVmVydGV4KFtwb3NBW2kgKiA0XSwgcG9zQVtpICogNCArIDFdLCBwb3NBW2kgKiA0ICsgMl0sIHBvc0FbaSAqIDQgKyAzXV0sIFsxLCAwLCAwLCAxXSwgWzAsIDBdKTtcclxuICAgICAgICBuZXdULmluZGV4ZXNBID0gbmV3SW5kZXhlc0E7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Q7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZVRldHJhZWRyKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICBsMSA9ICgzIC8gMikgLyBNYXRoLnNxcnQoMikgKiAwLjUsXHJcbiAgICAgICAgICAgIGwyID0gbDEgKiBNYXRoLnNxcnQoMykgLyAyO1xyXG5cclxuICAgICAgICB2YXIgcCA9IFtcclxuICAgICAgICAgICAgWzAsICAgICAgICAgMCwgICAwLjUsIDFdLFxyXG4gICAgICAgICAgICBbMCwgICAgICAgIGwxLCAtMC4yNSwgMV0sXHJcbiAgICAgICAgICAgIFtsMiwgIC1sMSAvIDIsIC0wLjI1LCAxXSxcclxuICAgICAgICAgICAgWy1sMiwgLWwxIC8gMiwgLTAuMjUsIDFdXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFyIHYgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB2W2ldID0gcFtpXS5jb25jYXQocFtpXSkuY29uY2F0KFsxLCAwLCAwLCAxLCAwLCAwXSk7XHJcblxyXG4gICAgICAgIHZhciBpbmRzID0gWzAsIDEsIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgMCwgMiwgMyxcclxuICAgICAgICAgICAgICAgICAgICAwLCAzLCAxLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsIDIsIDNdO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRvcG9sb2d5KHYsIGluZHMsIDEpO1xyXG4gICAgICAgIC8vcmV0dXJuIFRvcG9sb2d5LnNldEJ5UG9zQXJyYXlBbmRDb2xvcihwLCBpbmRzLCBbMSwgMCwgMSwgMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVTY3JlZW5SZWN0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVG9wb2xvZ3koW1stMSwgLTEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWzEsICAtMSwgMCwgMSwgMCwgMCwgMCwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbLTEsICAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsxLCAgIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDEsIDFdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLCAxLCAzLCAwLCAyLCAzXSwgMSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3ViZSgpIHtcclxuICAgICAgICB2YXIgYSA9IDAuNSAvIE1hdGguc3FydCgzKTtcclxuXHJcbiAgICAgICAgdmFyIHAgPSBbXHJcbiAgICAgICAgICAgIFstYSwgLWEsIC1hLCAxXSxcclxuICAgICAgICAgICAgWy1hLCAgYSwgLWEsIDFdLFxyXG4gICAgICAgICAgICBbYSwgICBhLCAtYSwgMV0sXHJcbiAgICAgICAgICAgIFthLCAgLWEsIC1hLCAxXSxcclxuICAgICAgICAgICAgWy1hLCAtYSwgIGEsIDFdLFxyXG4gICAgICAgICAgICBbLWEsICBhLCAgYSwgMV0sXHJcbiAgICAgICAgICAgIFthLCAgIGEsICBhLCAxXSxcclxuICAgICAgICAgICAgW2EsICAtYSwgIGEsIDFdLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHZhciB2ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdltpXSA9IHBbaV0uY29uY2F0KHBbaV0pLmNvbmNhdChbMCwgMF0pO1xyXG5cclxuICAgICAgICB2YXIgaW5kcyA9IFswLCAxLCAyLCAvLyBCb3R0b20gRmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIDAsIDIsIDMsXHJcbiAgICAgICAgICAgICAgICAgICAgNCwgNSwgNiwgLy8gVG9wIGZhY2VcclxuICAgICAgICAgICAgICAgICAgICA0LCA2LCA3LFxyXG4gICAgICAgICAgICAgICAgICAgIDAsIDQsIDUsIC8vIExlZnRcclxuICAgICAgICAgICAgICAgICAgICA1LCAxLCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsIDUsIDYsIC8vIEZyb250IFxyXG4gICAgICAgICAgICAgICAgICAgIDYsIDIsIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgMiwgNiwgNywgLy8gUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICA3LCAzLCAyLFxyXG4gICAgICAgICAgICAgICAgICAgIDMsIDcsIDQsIC8vIEJhY2tcclxuICAgICAgICAgICAgICAgICAgICA0LCAwLCAzLF07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVG9wb2xvZ3kodiwgaW5kcywgMSk7XHJcbiAgICAgICAgLy9yZXR1cm4gVG9wb2xvZ3kuc2V0QnlQb3NBcnJheUFuZENvbG9yKHAsIGluZHMsIFsxLCAwLCAxLCAxXSk7XHJcblxyXG4gICAgICAgIC8vdmFyIHNjYWxlID0gMTtcclxuICAgICAgICAvL3JldHVybiBUb3BvbG9neS5zZXRCeVBvc0FycmF5QW5kQ29sb3IoWy1zY2FsZSwgLXNjYWxlLCAwLCAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLCAtc2NhbGUsIDAsIDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUsIHNjYWxlLCAwLCAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXNjYWxlLCAtc2NhbGUsIDAsIDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtc2NhbGUsIHNjYWxlLCAwLCAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLCBzY2FsZSwgMCwgMV0sIFswLCAxLCAyLCA1LCAzLCA0XSwgWzEsIDAsIDEsIDFdKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0VmVydGV4QXJyYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0ZXhlc0EpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3V0ViA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy52ZXJ0ZXhlc0EubGVuZ3RoICogVmVydGV4LmxlbigpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52ZXJ0ZXhlc0EubGVuZ3RoICogVmVydGV4LmxlbigpOyBpKyspXHJcbiAgICAgICAgICAgICAgICBvdXRWW2ldID0gdGhpcy52ZXJ0ZXhlc0FbTWF0aC5mbG9vcihpIC8gVmVydGV4LmxlbigpKV1baSAlIFZlcnRleC5sZW4oKV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gIG91dFY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb3V0ViA9IFtdO1xyXG4gICAgICAgIHRoaXMudmVydGV4ZXNBLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgICAgICAgb3V0ViA9IG91dFYuY29uY2F0KGVsZW0ucC5jb25jYXQoZWxlbS5uKS5jb25jYXQoZWxlbS50KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkob3V0Vik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1RvcG9sb2d5LCBWZXJ0ZXh9IGZyb20gXCIuL3RvcG9sb2d5LmpzXCI7XHJcbmltcG9ydCB7TWF0ZXJpYWx9IGZyb20gXCIuL21hdGVyaWFsLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgICB2ZXJ0ZXhCdWZmZXI7XHJcbiAgICB2ZXJ0ZXhBcnJheTtcclxuICAgIGluZGV4ZXNBO1xyXG4gICAgcHJpbVZBTztcclxuICAgIFRyQ291bnQ7XHJcbiAgICBzaGFkZXI7XHJcbiAgICBtdGxOYW1lO1xyXG5cclxuICAgIGRyYXdUeXBlO1xyXG5cclxuICAgIHRleDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoIHJuZCwgbmV3U2hhZGVyLCB0b3BvbG9neSwgbmV3TXRsTmFtZSApIHtcclxuICAgICAgICB0aGlzLnNoYWRlciA9IG5ld1NoYWRlcjtcclxuICAgICAgICB0aGlzLmRyYXdUeXBlID0gcm5kLmdsLlRSSUFOR0xFUztcclxuICAgICAgICBpZiAobmV3TXRsTmFtZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMubXRsTmFtZSA9ICdkZWYnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5tdGxOYW1lID0gbmV3TXRsTmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcmltVkFPID0gcm5kLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICAgICAgcm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnByaW1WQU8pO1xyXG5cclxuICAgICAgICAvLyBDb3B5IHZlcnRleCBhcnJheVxyXG4gICAgICAgIHRoaXMudmVydGV4QXJyYXkgPSB0b3BvbG9neS5nZXRWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuaW5kZXhlc0EgPSBuZXcgVWludDMyQXJyYXkodG9wb2xvZ3kuaW5kZXhlc0EpO1xyXG4gICAgICAgIC8vdG9wb2xvZ3kudmVydGV4ZXNBLm1hcCgoZWxlbSk9Pnt0aGlzLnZlcnRleEFycmF5LmNvbmNhdChlbGVtLnAuY29uY2F0KGVsZW0ubikuY29uY2F0KGVsZW0uYykpO30pO1xyXG4gICAgICAgIHRoaXMuVHJDb3VudCA9IE1hdGguZmxvb3IodGhpcy5pbmRleGVzQS5sZW5ndGggLyAzKTtcclxuICAgICAgICAvL2NvbnN0IHBvc0FycmF5ID0gRmxvYXQzMkFycmF5KHRvcG9sb2d5LmdldFBvc0FycmF5KCkpO1xyXG4gICAgICAgIC8vY29uc3Qgbm9ybWFsQXJyYXkgPSBGbG9hdDMyQXJyYXkodG9wb2xvZ3kuZ2V0Tm9ybWFsQXJyYXkoKSk7XHJcbiAgICAgICAgLy9jb25zdCBjb2xvckFycmF5ID0gRmxvYXQzMkFycmF5KHRvcG9sb2d5LmdldENvbG9yQXJyYXkoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ29weSBpbmZvXHJcbiAgICAgICAgdmFyIEJ1ZiA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgcm5kLmdsLmJpbmRCdWZmZXIocm5kLmdsLkFSUkFZX0JVRkZFUiwgQnVmKTtcclxuICAgICAgICBybmQuZ2wuYnVmZmVyRGF0YShybmQuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEFycmF5LCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICAgXHJcbiAgICAgICAgdmFyIGluZGV4QnVmID0gcm5kLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICBybmQuZ2wuYmluZEJ1ZmZlcihybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGV4QnVmKTtcclxuICAgICAgICBybmQuZ2wuYnVmZmVyRGF0YShybmQuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kZXhlc0EsIHJuZC5nbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgICAgIC8vIEJpbmQgdG8gc2hhZGVyXHJcblxyXG4gICAgICAgIHZhciBwb3NMb2MgPSBybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zaGFkZXIucHJvZ3JhbSwgJ2luX3BvcycpO1xyXG4gICAgICAgIGlmIChwb3NMb2MgIT0gLTEpXHJcbiAgICAgICAgeyAvLyBjb25zb2xlLmxvZyhgQ2FuJ3QgZmluZCBcImluX3Bvc1wiLmApO1xyXG4gICAgICAgICAgICBybmQuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zTG9jKTtcclxuICAgICAgICAgICAgcm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgICAgICAgICBwb3NMb2MsICBcclxuICAgICAgICAgICAgICAgIFZlcnRleC5wTGVuKCksXHJcbiAgICAgICAgICAgICAgICBybmQuZ2wuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFZlcnRleC5sZW4oKSAqIDQsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICApOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBub3JtYWxMb2MgPSBybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zaGFkZXIucHJvZ3JhbSwgJ2luX25vcm0nKTtcclxuICAgICAgICBpZiAobm9ybWFsTG9jICE9IC0xKVxyXG4gICAgICAgIHsgLy8gY29uc29sZS5sb2coYENhbid0IGZpbmQgXCJpbl9ub3JtXCIuYCk7XHJcbiAgICAgICAgICAgIHJuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtYWxMb2MpO1xyXG4gICAgICAgICAgICBybmQuZ2wudmVydGV4QXR0cmliUG9pbnRlcihcclxuICAgICAgICAgICAgICAgIG5vcm1hbExvYywgIFxyXG4gICAgICAgICAgICAgICAgVmVydGV4Lm5MZW4oKSxcclxuICAgICAgICAgICAgICAgIHJuZC5nbC5GTE9BVCxcclxuICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgVmVydGV4LmxlbigpICogNCxcclxuICAgICAgICAgICAgICAgIFZlcnRleC5wTGVuKCkgKiA0LFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgdGV4TG9jID0gcm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc2hhZGVyLnByb2dyYW0sICdpbl90ZXgnKTtcclxuICAgICAgICBpZiAodGV4TG9jICE9IC0xKSAgXHJcbiAgICAgICAgeyAvLyBjb25zb2xlLmxvZyhgQ2FuJ3QgZmluZCBcImluX3RleFwiLmApO1xyXG4gICAgICAgICAgICBybmQuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4TG9jKTtcclxuICAgICAgICAgICAgcm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgICAgICAgICB0ZXhMb2MsICBcclxuICAgICAgICAgICAgICAgIFZlcnRleC50TGVuKCksXHJcbiAgICAgICAgICAgICAgICBybmQuZ2wuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFZlcnRleC5sZW4oKSAqIDQsXHJcbiAgICAgICAgICAgICAgICAoVmVydGV4LnBMZW4oKSArIFZlcnRleC5uTGVuKCkpICogNCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBkcmF3KCBybmQsIGNhbWVyYSwgbWF0cldQICkge1xyXG4gICAgICAgIGNhbWVyYS51cGRhdGVVYm8ocm5kLCB0aGlzLnNoYWRlcik7XHJcbiAgICAgICAgLy90aGlzLm10bC5hcHBseShnbCwgdGhpcy5zaGFkZXIpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvL3JuZC5nbC5jbGVhckNvbG9yKDEsIDAuNiwgMC44LCAxKTtcclxuICAgICAgICBybmQuZ2wuYmluZFZlcnRleEFycmF5KHRoaXMucHJpbVZBTyk7XHJcbiAgICAgICAgcm5kLmdsLnVzZVByb2dyYW0odGhpcy5zaGFkZXIucHJvZ3JhbSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQXBwbHkgdGV4dHVyZSBcclxuICAgICAgICBNYXRlcmlhbC5hcHBseUZyb21MaWIocm5kLCB0aGlzLnNoYWRlciwgdGhpcy5tdGxOYW1lKTtcclxuICAgICAgICAvLyBtYXRycyB3b3JsZFxyXG4gXHJcbiAgICAgICAgbGV0IHRtcExvYyA9IHJuZC5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXIucHJvZ3JhbSwgXCJtYXRyV1BcIik7XHJcbiAgICAgICAgaWYgKHRtcExvYyAhPSAtMSlcclxuICAgICAgICAgICAgcm5kLmdsLnVuaWZvcm1NYXRyaXg0ZnYodG1wTG9jLCB0cnVlLCBtYXRyV1AuTSk7XHJcbiAgICAgICAgdG1wTG9jID0gcm5kLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlci5wcm9ncmFtLCBcIm1hdHJWUFwiKTtcclxuICAgICAgICBpZiAodG1wTG9jICE9IC0xKVxyXG4gICAgICAgICAgICBybmQuZ2wudW5pZm9ybU1hdHJpeDRmdih0bXBMb2MsIHRydWUsIGNhbWVyYS5tYXRyVlAuTSk7XHJcbiAgICAgICAgdG1wTG9jID0gcm5kLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlci5wcm9ncmFtLCBcIm1hdHJQcm9qXCIpXHJcbiAgICAgICAgaWYgKHRtcExvYyAhPSAtMSlcclxuICAgICAgICAgICAgcm5kLmdsLnVuaWZvcm1NYXRyaXg0ZnYodG1wTG9jLCB0cnVlLCBjYW1lcmEubWF0clByb2ouTSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcm5kLmdsLmRyYXdFbGVtZW50cyh0aGlzLmRyYXdUeXBlLCB0aGlzLlRyQ291bnQgKiAzLCBybmQuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcclxuICAgIG5hbWU7XHJcbiAgICBwcmltcyA9IFtdO1xyXG4gICAgcHJpbUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdEZyb21Ub3Bwb2xvZ3koIHJuZCwgbmV3U2hhZGVyLCB0b3BvbG9neSApIHtcclxuICAgICAgICB0aGlzLnByaW1zW3RoaXMucHJpbXMubGVuZ3RoXSA9IG5ldyBQcmltKHJuZCwgbmV3U2hhZGVyLCB0b3BvbG9neSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0RnJvbVByaW0oIHJuZCwgcHJpbSApIHtcclxuICAgICAgICB0aGlzLnByaW1zW3RoaXMucHJpbXMubGVuZ3RoXSA9IHByaW07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdEVtcHR5KCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoIC4uLmFyZ3MgKSB7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdEVtcHR5KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RGcm9tUHJpbShhcmdzWzBdLCBhcmdzWzFdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdEZyb21Ub3Bwb2xvZ3koYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCBybmQsIGNhbWVyYSwgbWF0cldQID0gbmV3IG1hdGgubWF0cigpKSB7XHJcbiAgICAgICAgdGhpcy5wcmltcy5mb3JFYWNoKChlbGVtKT0+e1xyXG4gICAgICAgICAgICBlbGVtLmRyYXcocm5kLCBjYW1lcmEsIG1hdHJXUCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUHJpbSggbmFtZSwgcHJpbSApIHtcclxuICAgICAgICB0aGlzLnByaW1zW3RoaXMucHJpbUNvdW50ZXIrK10gPSBwcmltO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5wcmltc1tuYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMucHJpbXNbbmFtZV0gPSBwcmltO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLnByaW1zW25hbWUgKyBpXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbXNbbmFtZSArIGldID0gcHJpbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZCggcm5kLCBuZXdTaGFkZXIsIGZpbGVOYW1lICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBcIiArIGZpbGVOYW1lKTtcclxuICAgIFxyXG4gICAgICAgIHZhciBwYXRoQSA9IGZpbGVOYW1lLnNwbGl0KCcvJyksXHJcbiAgICAgICAgICAgIHBhdGggPSBmaWxlTmFtZS5yZXBsYWNlKHBhdGhBW3BhdGhBLmxlbmd0aCAtIDFdLCAnJyk7XHJcblxyXG4gICAgICAgIHZhciBtdGxzUHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIG91dDtcclxuICAgICAgICB2YXIgb3V0UCA9IGZldGNoKGZpbGVOYW1lICsgJz8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpKS50aGVuKChyZXMpPT57cmV0dXJuIHJlcy50ZXh0KCk7fSkudGhlbigoc291cmNlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBmaWxlTmFtZTtcclxuICAgICAgICAgICAgdmFyIGxpbmVzID0gc291cmNlLnNwbGl0KCdcXG4nKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgcEEgPSBbXTtcclxuICAgICAgICAgICAgdmFyIG5BID0gW107XHJcbiAgICAgICAgICAgIHZhciB0QSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlBID0gW107XHJcbiAgICAgICAgICAgIHZhciB2QSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgcENvdW50ZXIgPSAxLCBuQ291bnRlciA9IDEsIHRDb3VudGVyID0gMSwgaUNvdW50ZXIgPSAwLCB2Q291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIHZhciBjdXJQcmltTmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciB1c2VNdGwgPSAnZGVmJztcclxuXHJcbiAgICAgICAgICAgIGxpbmVzLmZvckVhY2goKGVsZW0pPT57XHJcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5yZXBsYWNlKCdcXHInLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd29yZHMgPSBlbGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHdvcmRzWzBdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZyc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdvJzogLy8gQ3JlYXRlIG5ldyBwcmltXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1clByaW1OYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFByaW0oY3VyUHJpbU5hbWUsIG5ldyBQcmltKHJuZC5nbCwgbmV3U2hhZGVyLCBuZXcgVG9wb2xvZ3kodkEsIGlBLCAxKSwgdXNlTXRsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBTdWJtaXQgcHJpbVxyXG4gICAgICAgICAgICAgICAgICAgIGlBID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdkEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpQ291bnRlciA9IDAsIHZDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmRzLmxlbmd0aCA9PT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyUHJpbU5hbWUgPSB3b3Jkc1sxXSArIFwiL1wiICsgd29yZHNbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJQcmltTmFtZSA9IHdvcmRzWzFdOyAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3YnOiAvLyBQb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3Jkcy5sZW5ndGggPT0gNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcEFbcENvdW50ZXIrK10gPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKSwgcGFyc2VGbG9hdCh3b3Jkc1s0XSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcEFbcENvdW50ZXIrK10gPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKSwgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2bic6IC8vIE5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3Jkcy5sZW5ndGggPT0gNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbkFbbkNvdW50ZXIrK10gPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKSwgcGFyc2VGbG9hdCh3b3Jkc1s0XSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbkFbbkNvdW50ZXIrK10gPSBbcGFyc2VGbG9hdCh3b3Jkc1sxXSksIHBhcnNlRmxvYXQod29yZHNbMl0pLCBwYXJzZUZsb2F0KHdvcmRzWzNdKSwgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2dCc6IC8vIFRleHR1cmVcclxuICAgICAgICAgICAgICAgICAgICB0QVt0Q291bnRlcisrXSA9IFtwYXJzZUZsb2F0KHdvcmRzWzFdKSwgcGFyc2VGbG9hdCh3b3Jkc1syXSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZic6IC8vIEluZGV4ZXNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0ViA9ICggaW5kcyApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aVsxXSAhPSAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwQVt2aVswXV0uY29uY2F0KG5BW3ZpWzJdXSkuY29uY2F0KHRBW3ZpWzFdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwQVt2aVswXV0uY29uY2F0KG5BW3ZpWzJdXSkuY29uY2F0KFswLCAwXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmkgPSB3b3Jkc1sxXS5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZBW3ZDb3VudGVyXSA9IGdldFYodmkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlBW3ZDb3VudGVyXSA9IHZDb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZpID0gd29yZHNbMl0uc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICB2QVt2Q291bnRlcl0gPSBnZXRWKHZpKTtcclxuICAgICAgICAgICAgICAgICAgICBpQVt2Q291bnRlcl0gPSB2Q291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2aSA9IHdvcmRzWzNdLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdkFbdkNvdW50ZXJdID0gZ2V0Vih2aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaUFbdkNvdW50ZXJdID0gdkNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ210bGxpYic6IC8vIExvYWQgbWF0ZXJpYWwgbGliXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG10bHNQcm9taXNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG10bHNQcm9taXNlID0gbmV3IFByb21pc2UuYWxsKFttdGxzUHJvbWlzZSwgdGhpcy5sb2FkTXRscyhybmQsIHBhdGggKyB3b3Jkc1sxXSldKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG10bHNQcm9taXNlID0gTWF0ZXJpYWwubG9hZE10bHMocm5kLCBwYXRoICsgd29yZHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXNlbXRsJzogLy8gVXNlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlTXRsID0gd29yZHNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY3VyUHJpbU5hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQcmltKGN1clByaW1OYW1lLCBuZXcgUHJpbShybmQsIG5ld1NoYWRlciwgbmV3IFRvcG9sb2d5KHZBLCBpQSwgMSksIHVzZU10bCkpO1xyXG4gICAgICAgICAgICB9IC8vIFN1Ym1pdCBwcmltXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pLnRoZW4oKGVsZW0pPT57cmV0dXJuIG91dCA9IGVsZW19KTtcclxuXHJcbiAgICAgICAgaWYgKG10bHNQcm9taXNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBvdXRQO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbb3V0UCwgbXRsc1Byb21pc2VdKS50aGVuKCgpPT57IHJldHVybiBvdXQ7IH0pOyAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCIuL3RleHR1cmUuanNcIjtcclxuaW1wb3J0IHsgVG9wb2xvZ3kgfSBmcm9tIFwiLi90b3BvbG9neS5qc1wiO1xyXG5pbXBvcnQgeyBQcmltIH0gZnJvbSBcIi4vcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzLCBtYXRyIH0gZnJvbSBcIi4uL21hdGgvbWF0aC5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhcmdldHMge1xyXG4gICAgZnJhbWVCdWZmZXI7XHJcblxyXG4gICAgdGV4UG9zO1xyXG4gICAgdGV4TklzU2hhZGU7XHJcbiAgICB0ZXhLYTtcclxuICAgIHRleEtkO1xyXG4gICAgdGV4S3NQaDtcclxuICAgIHRleENvbG9yVHJhbnM7XHJcblxyXG4gICAgZGVwdGhUZXg7XHJcblxyXG4gICAgcHJpbVZBTztcclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlVGFyZ2V0VGV4KCBybmQsIGF0dGFjaG1lbnQgKSB7XHJcbiAgICAgICAgdmFyIG91dFRleCA9IG5ldyBUZXh0dXJlKHJuZCwgcm5kLlcsIHJuZC5ILFxyXG4gICAgICAgICAgICAwLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1pcCBsZXZlbFxyXG4gICAgICAgICAgICBybmQuZ2wuUkdCQTMyRiwgLy8gaW50ZXJuYWwgZm9ybWF0XHJcbiAgICAgICAgICAgIDAsICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9yZGVyXHJcbiAgICAgICAgICAgIHJuZC5nbC5SR0JBLCAgIC8vIGZvcm1hdFxyXG4gICAgICAgICAgICBybmQuZ2wuRkxPQVQsICAgICAgLy8gdHlwZVxyXG4gICAgICAgICAgICBudWxsKTtcclxuICAgICAgICAvL3RoaXMuY29sb3JUZXggPSBuZXcgVGV4dHVyZShybmQsIFwiLi4vbW9kZWxzL2Nvd190ZXgucG5nXCIpO1xyXG4gICAgICAgIG91dFRleC5zZXRQYXJhbXMocm5kLCBbXHJcbiAgICAgICAgICAgIFtybmQuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBybmQuZ2wuTElORUFSXSxcclxuICAgICAgICAgICAgW3JuZC5nbC5URVhUVVJFX1dSQVBfUywgcm5kLmdsLkNMQU1QX1RPX0VER0VdLFxyXG4gICAgICAgICAgICBbcm5kLmdsLlRFWFRVUkVfV1JBUF9ULCBybmQuZ2wuQ0xBTVBfVE9fRURHRV1cclxuICAgICAgICBdKTtcclxuICAgICAgICBybmQuZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQocm5kLmdsLkZSQU1FQlVGRkVSLCBybmQuZ2wuQ09MT1JfQVRUQUNITUVOVDAgKyBhdHRhY2htZW50LCBybmQuZ2wuVEVYVFVSRV8yRCwgb3V0VGV4LnRleHR1cmUsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0VGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBybmQgKSB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmZyYW1lQnVmZmVyID0gcm5kLmdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XHJcbiAgICAgICAgcm5kLmdsLmJpbmRGcmFtZWJ1ZmZlcihybmQuZ2wuRlJBTUVCVUZGRVIsIHRoaXMuZnJhbWVCdWZmZXIpO1xyXG5cclxuICAgICAgICBybmQuZ2wuZHJhd0J1ZmZlcnMoW1xyXG4gICAgICAgICAgICBybmQuZ2wuQ09MT1JfQVRUQUNITUVOVDAsXHJcbiAgICAgICAgICAgIHJuZC5nbC5DT0xPUl9BVFRBQ0hNRU5UMSxcclxuICAgICAgICAgICAgcm5kLmdsLkNPTE9SX0FUVEFDSE1FTlQyLFxyXG4gICAgICAgICAgICBybmQuZ2wuQ09MT1JfQVRUQUNITUVOVDMsXHJcbiAgICAgICAgICAgIHJuZC5nbC5DT0xPUl9BVFRBQ0hNRU5UNCxcclxuICAgICAgICAgICAgcm5kLmdsLkNPTE9SX0FUVEFDSE1FTlQ1LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICAvLyBUZXh0dXJpZXNcclxuICAgICAgICB0aGlzLnRleFBvcyA9ICAgICAgICBUYXJnZXRzLmNyZWF0ZVRhcmdldFRleChybmQsIDApO1xyXG4gICAgICAgIHRoaXMudGV4TklzU2hhZGUgPSAgIFRhcmdldHMuY3JlYXRlVGFyZ2V0VGV4KHJuZCwgMSk7XHJcbiAgICAgICAgdGhpcy50ZXhLYSA9ICAgICAgICAgVGFyZ2V0cy5jcmVhdGVUYXJnZXRUZXgocm5kLCAyKTtcclxuICAgICAgICB0aGlzLnRleEtkID0gICAgICAgICBUYXJnZXRzLmNyZWF0ZVRhcmdldFRleChybmQsIDMpO1xyXG4gICAgICAgIHRoaXMudGV4S3NQaCA9ICAgICAgIFRhcmdldHMuY3JlYXRlVGFyZ2V0VGV4KHJuZCwgNCk7XHJcbiAgICAgICAgdGhpcy50ZXhDb2xvclRyYW5zID0gVGFyZ2V0cy5jcmVhdGVUYXJnZXRUZXgocm5kLCA1KTtcclxuICAgICAgICB0aGlzLmRlcHRoVGV4ID0gbmV3IFRleHR1cmUocm5kLCBybmQuVywgcm5kLkgsXHJcbiAgICAgICAgICAgIDAsICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWlwIGxldmVsXHJcbiAgICAgICAgICAgIHJuZC5nbC5ERVBUSF9DT01QT05FTlQyNCwgLy8gaW50ZXJuYWwgZm9ybWF0XHJcbiAgICAgICAgICAgIDAsICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9yZGVyXHJcbiAgICAgICAgICAgIHJuZC5nbC5ERVBUSF9DT01QT05FTlQsICAgLy8gZm9ybWF0XHJcbiAgICAgICAgICAgIHJuZC5nbC5VTlNJR05FRF9JTlQsICAgICAgLy8gdHlwZVxyXG4gICAgICAgICAgICBudWxsKTtcclxuICAgICAgICB0aGlzLmRlcHRoVGV4LnNldFBhcmFtcyhybmQsIFtcclxuICAgICAgICAgICAgW3JuZC5nbC5URVhUVVJFX01JTl9GSUxURVIsIHJuZC5nbC5MSU5FQVJdLFxyXG4gICAgICAgICAgICBbcm5kLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgcm5kLmdsLkxJTkVBUl0sXHJcbiAgICAgICAgICAgIFtybmQuZ2wuVEVYVFVSRV9XUkFQX1MsIHJuZC5nbC5DTEFNUF9UT19FREdFXSxcclxuICAgICAgICAgICAgW3JuZC5nbC5URVhUVVJFX1dSQVBfVCwgcm5kLmdsLkNMQU1QX1RPX0VER0VdXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgcm5kLmdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKHJuZC5nbC5GUkFNRUJVRkZFUiwgcm5kLmdsLkRFUFRIX0FUVEFDSE1FTlQsIHJuZC5nbC5URVhUVVJFXzJELCB0aGlzLmRlcHRoVGV4LnRleHR1cmUsIDApO1xyXG5cclxuXHJcbiAgICAgICAgLy8vLyBNYWtpbmcgdGFyZ2V0IHByaW1cclxuICAgICAgICAvLyBcclxuICAgICAgICAvL3ZhciBwb3NMb2MgPSBybmQuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLnByb2dyYW0sICdpbl9wb3MnKTtcclxuICAgICAgICAvL2lmIChwb3NMb2MgPT09IC0xKVxyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKGBDYW4ndCBmaW5kIFwiaW5fcG9zXCIuYCk7XHJcbiAgICAgICAgLy92YXIgdGV4TG9jID0gcm5kLmdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlci5wcm9ncmFtLCAnaW5fdGV4Jyk7XHJcbiAgICAgICAgLy9pZiAodGV4TG9jID09PSAtMSlcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhgQ2FuJ3QgZmluZCBcImluX3RleFwiLmApO1xyXG4gICAgLy9cclxuICAgICAgICAvL3RoaXMucHJpbVZBTyA9IHJuZC5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIC8vcm5kLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnByaW1WQU8pO1xyXG4vL1xyXG4gICAgICAgIC8vdmFyIEJ1ZiA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuLy9cclxuICAgICAgICAvL3JuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5BUlJBWV9CVUZGRVIsIEJ1Zik7XHJcbiAgICAgICAgLy9ybmQuZ2wuYnVmZmVyRGF0YShybmQuZ2wuQVJSQVlfQlVGRkVSLCB2QSwgcm5kLmdsLlNUQVRJQ19EUkFXKTtcclxuLy9cclxuICAgICAgICAvL3ZhciBpbmRleEJ1ZiA9IHJuZC5nbC5jcmVhdGVCdWZmZXIoKTtcclxuLy9cclxuICAgICAgICAvL3JuZC5nbC5iaW5kQnVmZmVyKHJuZC5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kZXhCdWYpO1xyXG4gICAgICAgIC8vcm5kLmdsLmJ1ZmZlckRhdGEocm5kLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRBLCBybmQuZ2wuU1RBVElDX0RSQVcpO1xyXG4vL1xyXG4gICAgICAgIC8vLy8gQmluZCB0byBzaGFkZXJcclxuLy9cclxuICAgICAgICAvL3JuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xyXG4gICAgICAgIC8vcm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgLy8gICAgcG9zTG9jLCAgXHJcbiAgICAgICAgLy8gICAgNCxcclxuICAgICAgICAvLyAgICBybmQuZ2wuRkxPQVQsXHJcbiAgICAgICAgLy8gICAgZmFsc2UsXHJcbiAgICAgICAgLy8gICAgKDQgKyAyKSAqIDQsXHJcbiAgICAgICAgLy8gICAgMCxcclxuICAgICAgICAvLyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL3JuZC5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhMb2MpO1xyXG4gICAgICAgIC8vcm5kLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgLy8gICAgdGV4TG9jLCAgXHJcbiAgICAgICAgLy8gICAgMixcclxuICAgICAgICAvLyAgICBybmQuZ2wuRkxPQVQsXHJcbiAgICAgICAgLy8gICAgZmFsc2UsXHJcbiAgICAgICAgLy8gICAgKDQgKyAyKSAqIDQsXHJcbiAgICAgICAgLy8gICAgNCAqIDQsXHJcbiAgICAgICAgLy8pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5RkIoIHJuZCApIHtcclxuICAgICAgICAvL3JuZC5nbC5lbmFibGUocm5kLmdsLkRFUFRIX1RFU1QpO1xyXG5cclxuICAgICAgICBybmQuZ2wuYmluZEZyYW1lYnVmZmVyKHJuZC5nbC5GUkFNRUJVRkZFUiwgdGhpcy5mcmFtZUJ1ZmZlcik7XHJcblxyXG4gICAgICAgIHJuZC5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApO1xyXG4gICAgICAgIC8vcm5kLmdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgcm5kLmdsLmNsZWFyKHJuZC5nbC5DT0xPUl9CVUZGRVJfQklUIHwgcm5kLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuICAgICAgICAvL2dsLmVuYWJsZShnbC5DVUxMX0ZBQ0UpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhcHBseUNhbnZhcyggcm5kICkge1xyXG4gICAgICAgIHJuZC5nbC5iaW5kRnJhbWVidWZmZXIocm5kLmdsLkZSQU1FQlVGRkVSLCBudWxsKTtcclxuICAgICAgICBybmQuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTsgICAvLyBjbGVhciB0byB3aGl0ZVxyXG4gICAgICAgIHJuZC5nbC5jbGVhcihybmQuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHJuZC5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kU2FtcGxlcnMoIHJuZCwgc2hhZGVyICkge1xyXG4gICAgICAgIHRoaXMudGV4UG9zLmJpbmQocm5kLCBzaGFkZXIsIFwiaW5Qb3NcIiwgMCk7XHJcbiAgICAgICAgdGhpcy50ZXhOSXNTaGFkZS5iaW5kKHJuZCwgc2hhZGVyLCBcImluTklzU2hhZGVcIiwgMSk7XHJcbiAgICAgICAgdGhpcy50ZXhLYS5iaW5kKHJuZCwgc2hhZGVyLCBcImluS2FcIiwgMik7XHJcbiAgICAgICAgdGhpcy50ZXhLZC5iaW5kKHJuZCwgc2hhZGVyLCBcImluS2RcIiwgMyk7XHJcbiAgICAgICAgdGhpcy50ZXhLc1BoLmJpbmQocm5kLCBzaGFkZXIsIFwiaW5Lc1BoXCIsIDQpO1xyXG4gICAgICAgIHRoaXMudGV4Q29sb3JUcmFucy5iaW5kKHJuZCwgc2hhZGVyLCBcImluQ29sb3JUcmFuc1wiLCA1KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5iaW5kU2FtcGxlcnMoIHJuZCApIHtcclxuICAgICAgICB0aGlzLnRleFBvcy4gICAgICAgdW5iaW5kKHJuZCwgMCk7XHJcbiAgICAgICAgdGhpcy50ZXhOSXNTaGFkZS4gIHVuYmluZChybmQsIDEpO1xyXG4gICAgICAgIHRoaXMudGV4S2EuICAgICAgICB1bmJpbmQocm5kLCAyKTtcclxuICAgICAgICB0aGlzLnRleEtkLiAgICAgICAgdW5iaW5kKHJuZCwgMyk7XHJcbiAgICAgICAgdGhpcy50ZXhLc1BoLiAgICAgIHVuYmluZChybmQsIDQpO1xyXG4gICAgICAgIHRoaXMudGV4Q29sb3JUcmFucy51bmJpbmQocm5kLCA1KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn0iLCJpbXBvcnQgeyBUb3BvbG9neSB9IGZyb20gXCIuL3RvcG9sb2d5LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMsIG1hdHIgfSBmcm9tIFwiLi4vbWF0aC9tYXRoLmpzXCI7XHJcbmltcG9ydCB7IFVibyB9IGZyb20gXCIuL21hdGVyaWFsLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGlnaHRpbmcgeyBcclxuICAgIGRpclNoYWRlcjtcclxuICAgIGRpclByaW07XHJcbiAgICBkaXJMaWdodHMgPSBbXTtcclxuICAgIGRpclVCTztcclxuXHJcbiAgICBwb2ludFNoYWRlcjtcclxuICAgIHBvaW50UHJpbTtcclxuICAgIHBvaW50TGlnaHRzID0gW107XHJcbiAgICBwb2ludFVCTztcclxuICAgIGRlYnVnUG9pbnRNb2RlbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdCggcm5kICkge1xyXG4gICAgICAgIGxldCByZWN0VG9wID0gVG9wb2xvZ3kuY3JlYXRlU2NyZWVuUmVjdCgpO1xyXG5cclxuICAgICAgICAvLyBEaXJlY3Rpb25hbFxyXG4gICAgICAgIHRoaXMuZGlyU2hhZGVyID0gYXdhaXQgcm5kLmNyZWF0ZVNoYWRlcignbGlnaHRzL2RpcicpO1xyXG4gICAgICAgIHRoaXMuZGlyUHJpbSA9IGF3YWl0IHJuZC5jcmVhdGVQcmltKHRoaXMuZGlyU2hhZGVyLCByZWN0VG9wKTtcclxuICAgICAgICB0aGlzLmRpclVCTyA9IG5ldyBVYm8ocm5kLCA0ICogNCAqIDIsIDQpO1xyXG5cclxuICAgICAgICAvLyBQb2ludFxyXG4gICAgICAgIHRoaXMucG9pbnRTaGFkZXIgPSBhd2FpdCBybmQuY3JlYXRlU2hhZGVyKCdsaWdodHMvcG9pbnQnKTtcclxuICAgICAgICB0aGlzLnBvaW50UHJpbSA9IGF3YWl0IHJuZC5jcmVhdGVQcmltKHRoaXMucG9pbnRTaGFkZXIsIHJlY3RUb3ApO1xyXG4gICAgICAgIHRoaXMucG9pbnRVQk8gPSBuZXcgVWJvKHJuZCwgNCAqIDQgKiAyLCA0KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWJ1Z1BvaW50TW9kZWwgPSBybmQuY3JlYXRlTW9kZWwocm5kLmNyZWF0ZVByaW0oVG9wb2xvZ3kuY3JlYXRlQ3ViZSgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyggcm5kLCBjYW1lcmEsIHRhcmdldCApIHtcclxuICAgICAgICBybmQuZ2wuZW5hYmxlKHJuZC5nbC5CTEVORCk7XHJcbiAgICAgICAgcm5kLmdsLmRpc2FibGUocm5kLmdsLkRFUFRIX1RFU1QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJuZC5nbC5ibGVuZEVxdWF0aW9uKHJuZC5nbC5GVU5DX0FERCk7XHJcbiAgICAgICAgcm5kLmdsLmJsZW5kRnVuYyhybmQuZ2wuT05FLCBybmQuZ2wuT05FKTtcclxuICAgIFxyXG4gICAgICAgIC8vIERpcmVjdGlvbiBsaWdodHNcclxuICAgICAgICB0aGlzLmRpclNoYWRlci51c2Uocm5kKTtcclxuICAgICAgICB0YXJnZXQuYmluZFNhbXBsZXJzKHJuZCwgdGhpcy5kaXJTaGFkZXIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaXJMaWdodHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRpclVCTy5zdWJtaXQocm5kLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMuZGlyTGlnaHRzW2ldLmdldERhdGFBKCkpKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJVQk8uYmluZChybmQsIHRoaXMuZGlyU2hhZGVyLCAnZGlyTGlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJQcmltLmRyYXcocm5kLCBjYW1lcmEsIG5ldyBtYXRyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUG9pbnQgbGlnaHRzXHJcbiAgICAgICAgdGhpcy5wb2ludFNoYWRlci51c2Uocm5kKTtcclxuICAgICAgICB0YXJnZXQuYmluZFNhbXBsZXJzKHJuZCwgdGhpcy5wb2ludFNoYWRlcik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvaW50TGlnaHRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wb2ludFVCTy5zdWJtaXQocm5kLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMucG9pbnRMaWdodHNbaV0uZ2V0RGF0YUEoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50VUJPLmJpbmQocm5kLCB0aGlzLnBvaW50U2hhZGVyLCAncG9pbnRMaWdodCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50UHJpbS5kcmF3KHJuZCwgY2FtZXJhLCBuZXcgbWF0cigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJuZC5nbC5kaXNhYmxlKHJuZC5nbC5CTEVORCk7XHJcbiAgICAgICAgcm5kLmdsLmVuYWJsZShybmQuZ2wuREVQVEhfVEVTVCk7XHJcblxyXG4gICAgICAgIHRhcmdldC51bmJpbmRTYW1wbGVycyhybmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdEZWJ1Zyggcm5kLCBjYW1lcmEgKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvaW50TGlnaHRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBybmQuZHJhd01vZGVsKHRoaXMuZGVidWdQb2ludE1vZGVsLCBtYXRyLnRyYW5zbGF0ZShuZXcgdmVjMyh0aGlzLnBvaW50TGlnaHRzW2ldLnBvc1swXSwgdGhpcy5wb2ludExpZ2h0c1tpXS5wb3NbMV0sIHRoaXMucG9pbnRMaWdodHNbaV0ucG9zWzJdKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ0RpckxpZ2h0KCBsaWdodCApIHtcclxuICAgICAgICBpZiAobGlnaHQgaW5zdGFuY2VvZiBEaXJMaWdodClcclxuICAgICAgICB0aGlzLmRpckxpZ2h0c1t0aGlzLmRpckxpZ2h0cy5sZW5ndGhdID0gbGlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnUG9pbnRMaWdodCggbGlnaHQgKSB7XHJcbiAgICAgICAgaWYgKGxpZ2h0IGluc3RhbmNlb2YgUG9pbnRMaWdodClcclxuICAgICAgICB0aGlzLnBvaW50TGlnaHRzW3RoaXMucG9pbnRMaWdodHMubGVuZ3RoXSA9IGxpZ2h0O1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXJMaWdodCB7XHJcbiAgICBkaXI7XHJcbiAgICBjb2xvcjtcclxuICAgIGludGVuc2l0eTtcclxuICAgIHZpc2liaWxpdHkgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBybmQsIG5ld0RpciwgbmV3Q29sb3IsIG5ld0ludGVuc2l0eSApIHtcclxuICAgICAgICB0aGlzLmRpciA9IG5ld0RpcjtcclxuICAgICAgICB0aGlzLmNvbG9yID0gbmV3Q29sb3I7XHJcbiAgICAgICAgdGhpcy5pbnRlbnNpdHkgPSBuZXdJbnRlbnNpdHk7XHJcbiAgICAgICAgcm5kLmxpZ2h0aW5nLnJlZ0RpckxpZ2h0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZpc2liaWxpdHkoIG5ld1ZhbHVlICkge1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0RGF0YUEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyLmNvbmNhdChbMV0pLmNvbmNhdCh0aGlzLmNvbG9yKS5jb25jYXQoW3RoaXMuaW50ZW5zaXR5XSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRMaWdodCB7XHJcbiAgICBwb3M7XHJcbiAgICBjb2xvcjtcclxuICAgIGludGVuc2l0eTtcclxuICAgIHZpc2liaWxpdHkgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBybmQsIG5ld1BvcywgbmV3Q29sb3IsIG5ld0ludGVuc2l0eSApIHtcclxuICAgICAgICB0aGlzLnBvcyA9IG5ld1BvcztcclxuICAgICAgICB0aGlzLmNvbG9yID0gbmV3Q29sb3I7XHJcbiAgICAgICAgdGhpcy5pbnRlbnNpdHkgPSBuZXdJbnRlbnNpdHk7XHJcbiAgICAgICAgcm5kLmxpZ2h0aW5nLnJlZ1BvaW50TGlnaHQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmlzaWJpbGl0eSggbmV3VmFsdWUgKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXREYXRhQSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3MuY29uY2F0KFsxXSkuY29uY2F0KHRoaXMuY29sb3IpLmNvbmNhdChbdGhpcy5pbnRlbnNpdHldKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7dmVjMywgbWF0cn0gZnJvbSBcIi4uL21hdGgvbWF0aC5qc1wiO1xyXG5pbXBvcnQge1VibywgTWF0ZXJpYWx9IGZyb20gXCIuL21hdGVyaWFsLmpzXCI7XHJcbmltcG9ydCB7U2hhZGVyfSBmcm9tIFwiLi9zaGFkZXIuanNcIjtcclxuaW1wb3J0IHtUb3BvbG9neX0gZnJvbSBcIi4vdG9wb2xvZ3kuanNcIjtcclxuaW1wb3J0IHtNb2RlbCwgUHJpbX0gZnJvbSBcIi4vcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyBUYXJnZXRzIH0gZnJvbSBcIi4vdGFyZ2V0LmpzXCI7XHJcbmltcG9ydCB7IExpZ2h0aW5nLCBEaXJMaWdodCwgUG9pbnRMaWdodCB9IGZyb20gXCIuL2xpZ2h0LmpzXCI7XHJcblxyXG5leHBvcnQgeyBEaXJMaWdodCwgUG9pbnRMaWdodCwgdmVjMywgbWF0ciB9O1xyXG5cclxuLy8gZXhwb3J0IHtVYm8sIE1hdGVyaWFsLCBTaGFkZXIsIFRvcG9sb2d5LCBNb2RlbCwgUHJpbSwgVGFyZ2V0c307XHJcblxyXG5jbGFzcyBDYW1lcmEge1xyXG4gICAgbWF0clByb2o7XHJcbiAgICBwb3M7XHJcbiAgICBhdDtcclxuICAgIHVwO1xyXG4gICAgcmlnaHQ7XHJcbiAgICBkaXI7XHJcbiAgICBkaXJMZW47XHJcbiAgICBtYXRyVlA7XHJcbiAgICB1Ym87XHJcblxyXG4gICAgbGlnaHRpbmc7XHJcbiAgICBpc1NoYXJlZCA9IHRydWU7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCBybmQsIG5ld1BvcywgbmV3QXQsIG5ld1VwLCBlbmFibGVNb3ZlbWVudCApIHtcclxuICAgICAgICB0aGlzLm1hdHJQcm9qID0gQ2FtZXJhLmNyZWF0ZURlZk1hdHJQcm9qKHJuZC5XLCBybmQuSCk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBuZXdQb3M7XHJcbiAgICAgICAgdGhpcy5hdCA9IG5ld0F0O1xyXG4gICAgICAgIHRoaXMudXAgPSBuZXdVcDtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmlzU2hhcmVkID0gZW5hYmxlTW92ZW1lbnQ7XHJcbiAgICAgICAgcm5kLmNhbnZhcy5vbm1vdXNlbW92ZSA9IChlKT0+e3RoaXMub25Nb3VzZU1vdmUoZSl9O1xyXG4gICAgICAgIHJuZC5jYW52YXMub253aGVlbCA9IChlKT0+e3RoaXMub25Nb3VzZVdoZWVsKGUpfTtcclxuICAgICAgICBybmQuY2FudmFzLm9uY29udGV4dG1lbnUgPSAoKT0+e3JldHVybiBmYWxzZTt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVibyBpbml0XHJcbiAgICAgICAgdGhpcy51Ym8gPSBuZXcgVWJvKHJuZCwgNCAqIDQgKiAyLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlRGVmTWF0clByb2ooIHcsIGggKSB7XHJcbiAgICAgICAgdmFyIGNvZWYgPSBwYXJzZUZsb2F0KGgpIC8gcGFyc2VGbG9hdCh3KTtcclxuICAgICAgICByZXR1cm4gbWF0ci5mcnVzdHVtKC0xLCAxLCAtY29lZiwgY29lZiwgMSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZGlyID0gdGhpcy5hdC5zdWIodGhpcy5wb3MpLm5vcm1hbGlzZSgpO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSB0aGlzLmRpci5jcm9zcyhuZXcgdmVjMygwLCAtMSwgMCkpLm5vcm1hbGlzZSgpO1xyXG4gICAgICAgIHRoaXMudXAgPSB0aGlzLmRpci5jcm9zcyh0aGlzLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLmRpckxlbiA9IHRoaXMuYXQuc3ViKHRoaXMucG9zKS5sZW5ndGgoKTsgXHJcblxyXG4gICAgICAgIHRoaXMubWF0clZQID0gbWF0ci52aWV3KHRoaXMucG9zLCB0aGlzLmF0LCB0aGlzLnVwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaXplKCBybmQgKSB7XHJcbiAgICAgICAgaWYgKHJuZC5XICE9IHJuZC5jYW52YXMuY2xpZW50V2lkdGggfHxcclxuICAgICAgICAgICAgcm5kLkggIT0gcm5kLmNhbnZhcy5jbGllbnRIZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBybmQucmVzaXplKHJuZC5jYW52YXMuY2xpZW50V2lkdGgsIHJuZC5jYW52YXMuY2xpZW50SGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5tYXRyUHJvaiA9IENhbWVyYS5jcmVhdGVEZWZNYXRyUHJvaihybmQuVywgcm5kLkgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVVYm8oIHJuZCwgc2hhZGVyICkge1xyXG4gICAgICAgIHRoaXMudWJvLnN1Ym1pdChybmQsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5wb3MudG9GbHRBKCkuY29uY2F0KFsxXSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdCh0aGlzLmF0LnRvRmx0QSgpLmNvbmNhdChbMV0pKSkpO1xyXG4gICAgICAgIHRoaXMudWJvLmJpbmQocm5kLCBzaGFkZXIsICdjYW1lcmEnKTtcclxuICAgIH0gXHJcblxyXG4gICAgb25Nb3VzZU1vdmUoIGUgKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hhcmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChlLmJ1dHRvbnMgJiAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wb3MgPSB0aGlzLmF0LmFkZCh0aGlzLnBvcy5zdWIodGhpcy5hdCkubXVsTWF0ciggbWF0ci5yb3RhdGUoLTAuMDAxNSAqIGUubW92ZW1lbnRYLCB0aGlzLnVwKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHRoaXMuYXQuYWRkKHRoaXMucG9zLnN1Yih0aGlzLmF0KS5tdWxNYXRyKCBtYXRyLnJvdGF0ZSgwLjAwMTUgKiBlLm1vdmVtZW50WSwgdGhpcy5yaWdodCkpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLmJ1dHRvbnMgJiAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRlbHRhID0gdGhpcy5yaWdodC5tdWxOdW0odGhpcy5kaXJMZW4gKiAwLjAwMSAqIGUubW92ZW1lbnRYKS5hZGQodGhpcy51cC5tdWxOdW0odGhpcy5kaXJMZW4gKiAwLjAwMSAqIGUubW92ZW1lbnRZKSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5wb3MuYWRkKGRlbHRhKTtcclxuICAgICAgICAgICAgdGhpcy5hdCA9IHRoaXMuYXQuYWRkKGRlbHRhKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZS5jbGllbnRYID0gMDtcclxuXHJcbiAgICAgICAgLy9lLmNsaWVudFggLT0gZS5tb3ZlbWVudFg7XHJcbiAgICAgICAgLy9lLmNsaWVudFkgLT0gZS5tb3ZlbWVudFk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VXaGVlbCggZSApIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTaGFyZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5wb3MgPSB0aGlzLmF0LmFkZCh0aGlzLnBvcy5zdWIodGhpcy5hdCkubXVsTnVtKE1hdGgucG93KDEuMSwgZS5kZWx0YVkgKiAwLjAxKSkpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL2NsYXNzIFNoYWRlclNsaWRlcjQge1xyXG4vLyAgICB1Ym87XHJcbi8vICAgIHNoYWRlclVib05hbWU7XHJcbi8vICAgIHhJRDtcclxuLy8gICAgeUlEO1xyXG4vLyAgICB6SUQ7XHJcbi8vICAgIHdJRDtcclxuLy9cclxuLy8gICAgc3RhdGljIGdldFNsaWRlckh0bWwoIGlkLCBsYWJlbCwgbWluLCBtYXgsIHN0ZXAgKSB7XHJcbi8vICAgICAgICByZXR1cm4gYDxsYWJlbCBpZD1cIiR7aWR9L0xhYmxlXCI+ICR7bGFiZWx9OiA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke2lkfVwiIG1pbj1cIiR7bWlufVwiIG1heD1cIiR7bWF4fVwiIHN0ZXA9XCIke3N0ZXB9XCIvPjwvbGFiZWw+PGJyLz5gO1xyXG4vLyAgICB9XHJcbi8vXHJcbi8vICAgIGNvbnN0cnVjdG9yKCBybmQsIGlkRm9yQWRkLCBuZXdTaGFkZXJVYm9OYW1lLCBtaW4sIG1heCwgZGVmICkge1xyXG4vLyAgICAgICAgdGhpcy5zaGFkZXJVYm9OYW1lID0gbmV3U2hhZGVyVWJvTmFtZTtcclxuLy8gICAgICAgIHRoaXMudWJvID0gbmV3IFVibyhybmQsIDE2LCAzKTsgLy8gb25lIHZlYzQgXHJcbi8vXHJcbi8vICAgICAgICAvLyBhZGQgc2xpZGVyc1xyXG4vL1xyXG4vLyAgICAgICAgdmFyIEFkZE9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkRm9yQWRkKTtcclxuLy9cclxuLy8gICAgICAgIGlmIChBZGRPYmogPT0gdW5kZWZpbmVkIHx8IEFkZE9iaiA9PSBudWxsKVxyXG4vLyAgICAgICAgICAgIGFsbGVydChcImZ1Y2tcIik7XHJcbi8vICAgICAgICBcclxuLy8gICAgICAgIEFkZE9iai5pbm5lckhUTUwgKz0gU2hhZGVyU2xpZGVyNC5nZXRTbGlkZXJIdG1sKGlkRm9yQWRkLnRvU3RyaW5nKCkgKyBcIi9cIiArIG5ld1NoYWRlclVib05hbWUudG9TdHJpbmcoKSArIFwiL1NsaWRlcjFcIiwgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIueFwiLCBtaW4sIG1heCwgKG1heCAtIG1pbikgKiAwLjAxKTtcclxuLy8gICAgICAgIEFkZE9iai5pbm5lckhUTUwgKz0gU2hhZGVyU2xpZGVyNC5nZXRTbGlkZXJIdG1sKGlkRm9yQWRkLnRvU3RyaW5nKCkgKyBcIi9cIiArIG5ld1NoYWRlclVib05hbWUudG9TdHJpbmcoKSArIFwiL1NsaWRlcjJcIiwgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIueVwiLCBtaW4sIG1heCwgKG1heCAtIG1pbikgKiAwLjAxKTtcclxuLy8gICAgICAgIEFkZE9iai5pbm5lckhUTUwgKz0gU2hhZGVyU2xpZGVyNC5nZXRTbGlkZXJIdG1sKGlkRm9yQWRkLnRvU3RyaW5nKCkgKyBcIi9cIiArIG5ld1NoYWRlclVib05hbWUudG9TdHJpbmcoKSArIFwiL1NsaWRlcjNcIiwgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIuelwiLCBtaW4sIG1heCwgKG1heCAtIG1pbikgKiAwLjAxKTtcclxuLy8gICAgICAgIEFkZE9iai5pbm5lckhUTUwgKz0gU2hhZGVyU2xpZGVyNC5nZXRTbGlkZXJIdG1sKGlkRm9yQWRkLnRvU3RyaW5nKCkgKyBcIi9cIiArIG5ld1NoYWRlclVib05hbWUudG9TdHJpbmcoKSArIFwiL1NsaWRlcjRcIiwgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIud1wiLCBtaW4sIG1heCwgKG1heCAtIG1pbikgKiAwLjAxKTtcclxuLy8gICAgICAgIHRoaXMueElEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRGb3JBZGQudG9TdHJpbmcoKSArIFwiL1wiICsgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIvU2xpZGVyMVwiKTtcclxuLy8gICAgICAgIHRoaXMueUlEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRGb3JBZGQudG9TdHJpbmcoKSArIFwiL1wiICsgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIvU2xpZGVyMlwiKTtcclxuLy8gICAgICAgIHRoaXMueklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRGb3JBZGQudG9TdHJpbmcoKSArIFwiL1wiICsgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIvU2xpZGVyM1wiKTtcclxuLy8gICAgICAgIHRoaXMud0lEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRGb3JBZGQudG9TdHJpbmcoKSArIFwiL1wiICsgbmV3U2hhZGVyVWJvTmFtZS50b1N0cmluZygpICsgXCIvU2xpZGVyNFwiKTtcclxuLy9cclxuLy8gICAgICAgIHRoaXMueElELnZhbHVlID0gZGVmO1xyXG4vLyAgICAgICAgdGhpcy55SUQudmFsdWUgPSBkZWY7XHJcbi8vICAgICAgICB0aGlzLnpJRC52YWx1ZSA9IGRlZjtcclxuLy8gICAgICAgIHRoaXMud0lELnZhbHVlID0gZGVmO1xyXG4vLyAgICB9XHJcbi8vXHJcbi8vICAgIHVwZGF0ZSggcm5kLCBzaGFkZXIgKSB7XHJcbi8vICAgICAgICB2YXIgdmVjNFZhbHVlID0gbmV3IEZsb2F0MzJBcnJheShbcGFyc2VGbG9hdCh0aGlzLnhJRC52YWx1ZSksXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdCh0aGlzLnlJRC52YWx1ZSksXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdCh0aGlzLnpJRC52YWx1ZSksXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdCh0aGlzLndJRC52YWx1ZSldKTtcclxuLy8gICAgICAgIHRoaXMudWJvLnN1Ym1pdChybmQsIHZlYzRWYWx1ZSk7XHJcbi8vICAgICAgICB0aGlzLnViby5iaW5kKHJuZCwgc2hhZGVyLCB0aGlzLnNoYWRlclVib05hbWUpO1xyXG4vLyAgICB9XHJcbi8vfVxyXG4vL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyIHtcclxuICAgIGNhbnZhcztcclxuICAgIGdsO1xyXG4gICAgVztcclxuICAgIEg7XHJcbiAgICBtdGxMaWIgPSBbXTtcclxuICAgIGRlZlNoYWRlcjtcclxuICAgIHRhcmdldDtcclxuICAgIHRhcmdldFNoYWRlcjtcclxuICAgIHRhcmdldFByaW07XHJcbiAgICBcclxuICAgIGNhbWVyYTtcclxuICAgIFxyXG5cclxuICAgICNpbml0R2woKSB7XHJcbiAgICAgICAgdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzLm9ucmVzaXplID0gdGhpcy51cGRhdGVTaXplO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckZCKCkge1xyXG4gICAgICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGNhbnZhc05hbWUgKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLkRpckxpZ2h0ID0gRGlyTGlnaHQ7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLlBvaW50TGlnaHQgPSBQb2ludExpZ2h0O1xyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNOYW1lKTtcclxuICAgICAgICB0aGlzLiNpbml0R2woKTtcclxuXHJcbiAgICAgICAgLy8gRGVmIHJlbmRlciBwYXJhbXNcclxuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xyXG4gICAgICAgIC8vdGhpcy5nbC5lbmFibGUodGhpcy5nbC5DVUxMX0ZBQ0UpO1xyXG5cclxuICAgICAgICAvLyBFeHRlbnRpb25zXHJcbiAgICAgICAgdGhpcy5nbC5nZXRFeHRlbnNpb24oXCJFWFRfY29sb3JfYnVmZmVyX2Zsb2F0XCIpO1xyXG4gICAgICAgIHRoaXMuZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0KCkgeyAvLyBJbml0IGRlZiB2YWx1ZXMgZnVuY3Rpb25cclxuICAgICAgICAvLyBMb2FkIGRlZiBzaGFkZXJcclxuICAgICAgICBNYXRlcmlhbC5hZGRUb010bExpYih0aGlzLCAnZGVmJywgbmV3IE1hdGVyaWFsKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmRlZlNoYWRlciA9IGF3YWl0IHRoaXMuY3JlYXRlU2hhZGVyKCdkZWZhdWx0X2Zvcl90YXJnZXQnKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRhcmdldCA9IG5ldyBUYXJnZXRzKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmxpZ2h0aW5nID0gbmV3IExpZ2h0aW5nKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5saWdodGluZy5pbml0KHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEodGhpcywgbmV3IHZlYzMoMTAsIDEwLCAxMCksIG5ldyB2ZWMzKDAsIDAsIDApLCBuZXcgdmVjMygwLCAxLCAwKSwgMSk7IC8vIERFRkFVTFQgY2FtZXJhXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY3JlYXRlU2hhZGVyKCBuYW1lICkge1xyXG4gICAgICAgIHZhciBzaGFkZXIgPSBuZXcgU2hhZGVyKCk7XHJcblxyXG4gICAgICAgIGF3YWl0IHNoYWRlci5sb2FkU2hhZGVyKHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBzaGFkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTW9kZWwoIC4uLmFyZ3MgKSB7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6IC8vIEVtcHR5XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1vZGVsKCk7XHJcbiAgICAgICAgICAgIGNhc2UgMTogLy8gTG9hZCBtb2RhbCB3aXRoIGRlZiBzaGFkZXJcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoYXJnc1swXSkgPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dE0gPSBuZXcgTW9kZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0TS5sb2FkKHRoaXMsIHRoaXMuZGVmU2hhZGVyLCBhcmdzWzBdKS50aGVuKCgpPT57IHJldHVybiBvdXRNOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIFByaW0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCh0aGlzLCBhcmdzWzBdKTtcclxuICAgICAgICAgICAgY2FzZSAyOiAvLyBMb2FkIG1vZGFsIHdpdGggY3VzdG9tIHNoYWRlclxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBTaGFkZXIgJiYgdHlwZW9mKGFyZ3NbMV0pID09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dE0gPSBuZXcgTW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dE0ubG9hZCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdKS50aGVuKCgpPT57IHJldHVybiBvdXRNOyB9KTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb3BvbG9neSggLi4uYXJncyApIHtcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDogLy8gRW1wdHlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVG9wb2xvZ3koW10sIFtdKTtcclxuICAgICAgICAgICAgY2FzZSAyOiAvLyBGdWxsXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRvcG9sb2d5KGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICBjYXNlIDM6IC8vIEZ1bGwgd2l0aCBmbGFnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRvcG9sb2d5KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQcmltKCAuLi5hcmdzICkge1xyXG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBUb3BvbG9neSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByaW0odGhpcywgdGhpcy5kZWZTaGFkZXIsIGFyZ3NbMF0pO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIFNoYWRlciAmJiBhcmdzWzFdIGluc3RhbmNlb2YgVG9wb2xvZ3kpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcmltKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIFRvcG9sb2d5ICYmIGFyZ3NbMV0gaW5zdGFuY2VvZiBNYXRlcmlhbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByaW0odGhpcywgdGhpcy5kZWZTaGFkZXIsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIFNoYWRlciAmJiBhcmdzWzFdIGluc3RhbmNlb2YgVG9wb2xvZ3kgJiYgYXJnc1syXSBpbnN0YW5jZW9mIE1hdGVyaWFsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJpbSh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKCBuZXdXLCBuZXdIICkge1xyXG4gICAgICAgIC8vdmFyIGNhbnZhc1N0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5jYW52YXMpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLkggPSBwYXJzZUZsb2F0KGNhbnZhc1N0eWxlLmhlaWdodCk7XHJcbiAgICAgICAgLy8gdGhpcy5jYW52YXMud2lkdGggID0gdGhpcy5XID0gcGFyc2VGbG9hdChjYW52YXNTdHlsZS53aWR0aCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5XID0gbmV3VztcclxuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLkggPSBuZXdIO1xyXG4gICAgICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5XLCB0aGlzLkgpO1xyXG4gICAgICAgIC8vdGhpcy5nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcblxyXG4gICAgICAgIC8vdGhpcy5nbC5kcmF3aW5nQnVmZmVyV2lkdGggPSB0aGlzLlc7IFxyXG4gICAgICAgIC8vdGhpcy5nbC5kcmF3aW5nQnVmZmVySGVpZ2h0ID0gdGhpcy5IOyBcclxuICAgICAgICAvL3RoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTdGFjayA9IFtdO1xyXG5cclxuICAgIGRyYXdNb2RlbCggbW9kZWwsIG1hdHJXICkge1xyXG4gICAgICAgIHRoaXMuZHJhd1N0YWNrW3RoaXMuZHJhd1N0YWNrLmxlbmd0aF0gPSBbbW9kZWwsIG1hdHJXXTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlU2l6ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgLy90aGlzLmxpZ2h0aW5nLmRyYXdEZWJ1Zyh0aGlzLCB0aGlzLmNhbWVyYSk7XHJcblxyXG4gICAgICAgIC8vIERyYXcgdG8gdGFyZ2V0XHJcbiAgICAgICAgdGhpcy50YXJnZXQuYXBwbHlGQih0aGlzKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHJhd1N0YWNrLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdTdGFja1tpXVswXS5kcmF3KHRoaXMsIHRoaXMuY2FtZXJhLCB0aGlzLmRyYXdTdGFja1tpXVsxXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRHJhdyB0byBjYW52YXNcclxuICAgICAgICBUYXJnZXRzLmFwcGx5Q2FudmFzKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubGlnaHRpbmcuZHJhdyh0aGlzLCB0aGlzLmNhbWVyYSwgdGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuZHJhd1N0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNPLE1BQU0sSUFBSSxDQUFDO0FBQ2xCO0FBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1Y7QUFDQSxJQUFJLFdBQVcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHO0FBQ2pELFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLEtBQUs7QUFDTDtBQUNBLElBQUksR0FBRyxFQUFFLEtBQUssR0FBRztBQUNqQixRQUFRLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RSxLQUFLO0FBQ0w7QUFDQSxJQUFJLE1BQU0sR0FBRztBQUNiLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUUsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQ3JCLE1BQU0sT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwRSxLQUFLO0FBQ0w7QUFDQSxJQUFJLEtBQUssRUFBRSxLQUFLLEdBQUc7QUFDbkIsTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckksS0FBSztBQUNMO0FBQ0EsSUFBSSxHQUFHLEVBQUUsS0FBSyxHQUFHO0FBQ2pCLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLEtBQUs7QUFDTCxJQUFJLE1BQU0sRUFBRSxDQUFDLEdBQUc7QUFDaEIsTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUQsS0FBSztBQUNMO0FBQ0EsSUFBSSxHQUFHLEVBQUUsS0FBSyxHQUFHO0FBQ2pCLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxHQUFHO0FBQ2hCLE1BQU0sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM1QyxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQ2QsSUFBSTtBQUNKLE1BQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNHO0FBQ0EsTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEgsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEgsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFILEtBQUs7QUFDTDtBQUNBLElBQUksTUFBTSxHQUFHO0FBQ2IsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNPLE1BQU0sSUFBSSxDQUFDO0FBQ2xCLElBQUksQ0FBQyxDQUFDO0FBQ047QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLE1BQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN6QjtBQUNBLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixRQUFRLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDdEI7QUFDQTtBQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFLHVCQUF1QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUUsdUJBQXVCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3RGLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0Usd0JBQXdCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvRSx3QkFBd0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDdkYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUUsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvRSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFFLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRjtBQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0UsbUJBQW1CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxRSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENB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QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekUsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2pGLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0UsbUJBQW1CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxRSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUUsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvRSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFFLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRjtBQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0UsbUJBQW1CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxRSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUUsa0JBQWtCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakYsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvRSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFFLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsRixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEIsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5RSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFF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R0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzdCO0FBQ0EsTUFBTSxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQzdILHNCQUFzQixFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUM1SCxzQkFBc0IsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDNUgsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxHQUFHO0FBQ2hCLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hHLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hHLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hHLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRyxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7QUFDM0IsY0FBYyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7QUFDM0IsY0FBYyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUM3QixNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ2hFLGFBQWEsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDakUsS0FBSztBQUNMO0FBQ0EsSUFBSSxNQUFNLEdBQUc7QUFDYixNQUFNLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZHLGtDQUFrQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekYsa0NBQWtDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzFGLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkcsMkNBQTJDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRywyQ0FBMkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RywyQ0FBMkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLDJDQUEyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZHLDJDQUEyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEcsMkNBQTJDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEcsS0FBSztBQUNMO0FBQ0EsSUFBSSxHQUFHLEVBQUUsRUFBRTtBQUNYLElBQUk7QUFDSixNQUFNLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDM0I7QUFDQSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUYsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEcsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5RixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUY7QUFDQSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUYsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEcsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5RixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUY7QUFDQSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUYsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEcsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5RixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUY7QUFDQSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUYsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEcsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5RixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xHLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUY7QUFDQSxNQUFNLE9BQU8sR0FBRyxDQUFDO0FBQ2pCLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHO0FBQzdCLElBQUk7QUFDSixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEMsTUFBTSxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDL0MsTUFBTSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDO0FBQ0EsTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUM5QyxzQkFBc0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzlDLHNCQUFzQixLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDOUMsc0JBQXNCLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUYsS0FBSztBQUNMO0FBQ0EsSUFBSSxPQUFPLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUc7QUFDckQsSUFBSTtBQUNKLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNqRCxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDakQsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQy9DLHNCQUFzQixDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFL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QUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pELEtBQUs7QUFDTDtBQUNBLElBQUksTUFBTSxHQUFHO0FBQ2IsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyRCxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDcEUsUUFBUSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JEO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1RCxLQUFLO0FBQ0w7QUFDQSxJQUFJLFVBQVUsRUFBRSxHQUFHLEdBQUc7QUFDdEIsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXO0FBQzNDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVk7QUFDNUMsUUFBUTtBQUNSLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsTUFB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LElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUN0RCxZQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRTtBQUNBO0FBQ0EsUUFBUSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNELFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLEtBQUs7QUFDTDs7OzsifQ==
