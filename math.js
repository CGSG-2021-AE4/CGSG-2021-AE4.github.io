// Vec3

export class vec3 {

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
export class matr {
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