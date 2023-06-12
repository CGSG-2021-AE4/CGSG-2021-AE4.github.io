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
        return new vec3(this.x + other.x, this.y += other.y, this.z += other.z);
    }

    lengh() {
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

    sub( other ) {
      return new vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
}

// Matrs
class matr {
    M;
  
    inverse() {
      det = this.length();
      r = matr();
    
      if (det == 0)
        return matr();
  
      /* build adjoint matrix */
      r.M[0][0] =
        Determ3x3(M[1][1], M[1][2], M[1][3],
                  M[2][1], M[2][2], M[2][3],
                  M[3][1], M[3][2], M[3][3]) / det;
      r.M[1][0] =
        -Determ3x3(M[1][0], M[1][2], M[1][3],
                   M[2][0], M[2][2], M[2][3],
                   M[3][0], M[3][2], M[3][3]) / det;
      r.M[2][0] =
        Determ3x3(M[1][0], M[1][1], M[1][3],
                  M[2][0], M[2][1], M[2][3],
                  M[3][0], M[3][1], M[3][3]) / det;
      r.M[3][0] =
        -Determ3x3(M[1][0], M[1][1], M[1][2],
                   M[2][0], M[2][1], M[2][2],
                   M[3][0], M[3][1], M[3][2]) / det;
     
      r.M[0][1] =
        -Determ3x3(M[0][1], M[0][2], M[0][3],
                   M[2][1], M[2][2], M[2][3],
                   M[3][1], M[3][2], M[3][3]) / det;
      r.M[1][1] =
        Determ3x3(M[0][0], M[0][2], M[0][3],
                  M[2][0], M[2][2], M[2][3],
                  M[3][0], M[3][2], M[3][3]) / det;
      r.M[2][1] =
        -Determ3x3(M[0][0], M[0][1], M[0][3],
                   M[2][0], M[2][1], M[2][3],
                   M[3][0], M[3][1], M[3][3]) / det;
      r.M[3][1] =
        Determ3x3(M[0][0], M[0][1], M[0][2],
                  M[2][0], M[2][1], M[2][2],
                  M[3][0], M[3][1], M[3][2]) / det;
     
      r.M[0][2] =
        Determ3x3(M[0][1], M[0][2], M[0][3],
                  M[1][1], M[1][2], M[1][3],
                  M[3][1], M[3][2], M[3][3]) / det;
      r.M[1][2] =
        -Determ3x3(M[0][0], M[0][2], M[0][3],
                   M[1][0], M[1][2], M[1][3],
                   M[3][0], M[3][2], M[3][3]) / det;
      r.M[2][2] =
        Determ3x3(M[0][0], M[0][1], M[0][3],
                  M[1][0], M[1][1], M[1][3],
                  M[3][0], M[3][1], M[3][3]) / det;
      r.M[3][2] =
        -Determ3x3(M[0][0], M[0][1], M[0][2],
                   M[1][0], M[1][1], M[1][2],
                   M[3][0], M[3][1], M[3][2]) / det;
     
      r.M[0][3] =
        -Determ3x3(M[0][1], M[0][2], M[0][3],
                   M[1][1], M[1][2], M[1][3],
                   M[2][1], M[2][2], M[2][3]) / det;
      r.M[1][3] =
        Determ3x3(M[0][0], M[0][2], M[0][3],
                  M[1][0], M[1][2], M[1][3],
                  M[2][0], M[2][2], M[2][3]) / det;
      r.M[2][3] =
        -Determ3x3(M[0][0], M[0][1], M[0][3],
                   M[1][0], M[1][1], M[1][3],
                   M[2][0], M[2][1], M[2][3]) / det;
      r.M[3][3] =
        Determ3x3(M[0][0], M[0][1], M[0][2],
                  M[1][0], M[1][1], M[1][2],
                  M[2][0], M[2][1], M[2][2]) / det;
      return r;
    }
  
    constructor( A00 = 1, A01 = 0, A02 = 0, A03 = 0,
                 A10 = 0, A11 = 1, A12 = 0, A13 = 0,
                 A20 = 0, A21 = 0, A22 = 1, A23 = 0,
                 A30 = 0, A31 = 0, A32 = 0, A33 = 1 ) {
      this.M = [A00, A01, A02, A03, 
           A10, A11, A12, A13, 
           A20, A21, A22, A23,
           A30, A31, A32, A33];
    }
  
    scale( s ) {
      return new matr(s.x, 0, 0, 0,
                      0, s.y, 0, 0,
                      0, 0, s.z, 0,
                      0, 0, 0, 1);
    }
    
    identity() {
      return new matr();
    }
  
    translate( t ) {
      return new matr(1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      t.x, t.y, t.z, 1);
    }
      
    rotateX( A )
    {
      si = Math.sin(A), co = Math.cos(A);
  
      return new matr(1, 0, 0, 0,
                      0, co, si, 0,
                      0, -si, co, 0,
                      0, 0, 0, 1);
    }
  
    rotateY( A )
    {
      si = Math.sin(A), co = Math.cos(A);
   
      return  newmatr(co, 0, -si, 0,
                      0, 1, 0, 0,
                      si, 0, co, 0,
                      0, 0, 0, 1);
    }
  
    rotateZ( A )
    {
      si = Math.sin(A), co = Math.cos(A);
      return new matr(co, si, 0, 0,
                     -si, co, 0, 0,
                      0, 0, 1, 0,
                      0, 0, 0, 1);
    }
  
    rotate( A, V )
    {
      si = Math.sin(A), co = Math.cos(A);
      V1 = V.Normalizing();
    
      return new  matr(co + V1.X * V1.X * (1 - co), V1.Y * V1.X * (1 - co) + V1.Z * si, V1.Z * V1.X * (1 - co) - V1.Y * si, 0,
                  V1.Y * V1.X * (1 - co) - V1.Z * si, co + V1.Y * V1.Y * (1 - co), V1.Y * V1.Z * (1 - co) + V1.X * si, 0,
                  V1.Z * V1.X * (1 - co) + V1.Y * si, V1.Z * V1.Y * (1 - co) - V1.X * si, co + V1.Z * V1.Z * (1 - co), 0,
                  0, 0, 0, 1); 
    }
  
    transpose() {
      return new matr(M[0][0], M[1][0], M[2][0], M[3][0],
                      M[0][1], M[1][1], M[2][1], M[3][1],
                      M[0][2], M[1][2], M[2][2], M[3][2],
                      M[0][3], M[1][3], M[2][3], M[3][3]);
    }
  
    determ3x3(A11, A12, A13,
              A21, A22, A23,
              A31, A32, A33) {
      return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 -
             A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
    }
  
    length() {
      return M[0][0] * Determ3x3(M[1][1], M[1][2], M[1][3],
                             M[2][1], M[2][2], M[2][3],
                             M[3][1], M[3][2], M[3][3]) +
            -M[0][1] * Determ3x3(M[1][0], M[1][2], M[1][3],
                                 M[2][0], M[2][2], M[2][3],
                                 M[3][0], M[3][2], M[3][3]) +
            +M[0][2] * Determ3x3(M[1][0], M[1][1], M[1][3],
                                 M[2][0], M[2][1], M[2][3],
                                 M[3][0], M[3][1], M[3][3]) +
            -M[0][3] * Determ3x3(M[1][0], M[1][1], M[1][2],
                                 M[2][0], M[2][1], M[2][2],
                                 M[3][0], M[3][1], M[3][2]);
    }
  
    mul( M2 )
    {
      res = new matr();
    
      res.M[0][0] = M[0][0] * M2.M[0][0] + M[0][1] * M2.M[1][0] + 
                    M[0][2] * M2.M[2][0] + M[0][3] * M2.M[3][0];
      res.M[0][1] = M[0][0] * M2.M[0][1] + M[0][1] * M2.M[1][1] + 
                    M[0][2] * M2.M[2][1] + M[0][3] * M2.M[3][1];
      res.M[0][2] = M[0][0] * M2.M[0][2] + M[0][1] * M2.M[1][2] + 
                    M[0][2] * M2.M[2][2] + M[0][3] * M2.M[3][2];
      res.M[0][3] = M[0][0] * M2.M[0][3] + M[0][1] * M2.M[1][3] + 
                    M[0][2] * M2.M[2][3] + M[0][3] * M2.M[3][3];
  
      res.M[1][0] = M[1][0] * M2.M[0][0] + M[1][1] * M2.M[1][0] + 
                    M[1][2] * M2.M[2][0] + M[1][3] * M2.M[3][0];
      res.M[1][1] = M[1][0] * M2.M[0][1] + M[1][1] * M2.M[1][1] + 
                    M[1][2] * M2.M[2][1] + M[1][3] * M2.M[3][1];
      res.M[1][2] = M[1][0] * M2.M[0][2] + M[1][1] * M2.M[1][2] + 
                    M[1][2] * M2.M[2][2] + M[1][3] * M2.M[3][2];
      res.M[1][3] = M[1][0] * M2.M[0][3] + M[1][1] * M2.M[1][3] + 
                    M[1][2] * M2.M[2][3] + M[1][3] * M2.M[3][3];
               
      res.M[2][0] = M[2][0] * M2.M[0][0] + M[2][1] * M2.M[1][0] + 
                    M[2][2] * M2.M[2][0] + M[2][3] * M2.M[3][0];
      res.M[2][1] = M[2][0] * M2.M[0][1] + M[2][1] * M2.M[1][1] + 
                    M[2][2] * M2.M[2][1] + M[2][3] * M2.M[3][1];
      res.M[2][2] = M[2][0] * M2.M[0][2] + M[2][1] * M2.M[1][2] + 
                    M[2][2] * M2.M[2][2] + M[2][3] * M2.M[3][2];
      res.M[2][3] = M[2][0] * M2.M[0][3] + M[2][1] * M2.M[1][3] + 
                    M[2][2] * M2.M[2][3] + M[2][3] * M2.M[3][3];
    
      res.M[3][0] = M[3][0] * M2.M[0][0] + M[3][1] * M2.M[1][0] + 
                    M[3][2] * M2.M[2][0] + M[3][3] * M2.M[3][0];
      res.M[3][1] = M[3][0] * M2.M[0][1] + M[3][1] * M2.M[1][1] + 
                    M[3][2] * M2.M[2][1] + M[3][3] * M2.M[3][1];
      res.M[3][2] = M[3][0] * M2.M[0][2] + M[3][1] * M2.M[1][2] + 
                    M[3][2] * M2.M[2][2] + M[3][3] * M2.M[3][2];
      res.M[3][3] = M[3][0] * M2.M[0][3] + M[3][1] * M2.M[1][3] + 
                    M[3][2] * M2.M[2][3] + M[3][3] * M2.M[3][3];
  
      return res;
    }
  
    view( Loc, At, Up1 )
    {
      Dir = (At - Loc).Normalizing(),
      Right = (Dir.cross(Up1)).Normalizing(),
      Up = Right.cross(Dir);
    
      return new matr(Right.X, Up.X, -Dir.X, 0,
                      Right.Y, Up.Y, -Dir.Y, 0,
                      Right.Z, Up.Z, -Dir.Z, 0,
                      -(Loc & Right), -(Loc & Up), (Loc & Dir), 1);
    }
  
    ortho( Left, Right, Bottom, Top, Near, Far )
    {
      return new matr(2 / (Right - Left), 0, 0, 0,
                      0, 2 / (Top - Bottom), 0, 0,
                      0, 0, 2 / (Near - Far), 0,
                      (Right + Left) / (Left - Right), (Top + Bottom) / (Bottom - Top), (Far + Near) / (Near - Far), 1);
    }
  
    frustum( Left, Right, Bottom, Top, Near, Far ) {
      return new matr(2 * Near / (Right - Left), 0, 0, 0,
                      0, 2 * Near / (Top - Bottom), 0, 0,
                      (Right + Left) / (Right - Left), (Top + Bottom) / (Top - Bottom),
                      (Far + Near) / (Near - Far), -1,
                      0, 0, 2 * Near * Far / (Near - Far), 0);
    }
  }