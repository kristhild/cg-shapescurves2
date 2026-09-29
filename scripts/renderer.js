class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let pt0 = {x: 100, y: 100}
        let pt1 = {x: 200, y: 350}
        let pt2 = {x: 300, y: 350}
        let pt3 = {x: 400, y: 100}

        this.drawBezierCurve(pt0, pt1, pt2, pt3, this.num_curve_sections, [255, 0, 0, 255], framebuffer)

        console.log(this.show_points)

        let pt4 = {x: 200, y: 500}
        let pt5 = {x: 350, y: 200}
        let pt6 = {x: 440, y: 300}
        let pt7 = {x: 500, y: 500}

        this.drawBezierCurve(pt4, pt5, pt6, pt7, this.num_curve_sections, [0, 100, 100, 255], framebuffer)
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let center1 = {x: 300, y: 300}
        this.drawCircle(center1, 100, this.num_curve_sections, [100, 100, 0, 255], framebuffer)

        let center2 = {x:400, y:400}
        this.drawCircle(center2, 150, this.num_curve_sections, [100, 0, 100, 255], framebuffer)
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let vertices1 = [{x: 180, y: 400}, {x: 50, y: 200}, {x: 80, y: 300}, {x: 140, y: 120}, {x:250, y:250}]
        this.drawConvexPolygon(vertices1, [255, 0, 0, 255], framebuffer);

        let center = 400
        let vertices2 = [{x: center, y: center + 110}, {x: center-40, y: center + 100}, {x: center - 85, y: center + 40}, {x: center - 60, y: center - 25},  {x: center, y: center - 200}, {x: center + 200, y: center - 60}, {x:center + 20, y: center + 40}, {x:center-150, y:center-150}]
        this.drawConvexPolygon(vertices2, [0, 0, 255, 255], framebuffer);

        let vertices3 = [{x:250, y:250}, {x:200, y:300}, {x:250, y:350}, {x:300, y:300}]
        this.drawConvexPolygon(vertices3, [100, 0, 50, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let c = [100, 100, 0, 255]
        let v_list = [{x:20, y:350}, {x:20, y:250},{x:20, y:300},{x:75, y:350},{x:75, y:250},{x:100, y:250},{x:155, y:250},{x:180, y:320},{x:180, y:250},{x:295, y:350},{x:370, y:350},{x:332, y:350},{x:332, y:250},{x:400, y:320},{x:400, y:250},{x:435, y:350},{x:435, y:250},{x:500, y:350},{x:500, y:250},{x:525, y:250},{x:562, y:350},{x:600, y:250},{x:544, y:300},{x:581, y:300},{x:544, y:300}]
        if(this.show_points){
            for(let i=0;i<v_list.length;i++){
                this.drawVertex(v_list[i], c, framebuffer)
            }
        }
        
        //K
        this.drawLine({x:20, y:350}, {x:20, y:250}, c, framebuffer)
        this.drawLine({x:20, y:300}, {x:75, y:350}, c, framebuffer)
        this.drawLine({x:20, y:300}, {x:75, y:250}, c, framebuffer)

        //R
        this.drawLine({x:100, y:350}, {x:100, y:250}, c, framebuffer)
        this.drawBezierCurve({x:100, y:350}, {x:170, y:355}, {x:170, y:295}, {x:100, y:300}, this.num_curve_sections, c, framebuffer)
        this.drawLine({x:100, y:300}, {x:155, y:250}, c, framebuffer)

        //I
        this.drawCircle({x:180, y:340}, 10, this.num_curve_sections, c, framebuffer)
        this.drawLine({x:180, y:320}, {x:180, y:250}, c, framebuffer)

        //S
        this.drawBezierCurve({x:265, y:348}, {x:200, y:360}, {x:200, y:300}, {x:240, y:300}, this.num_curve_sections, c, framebuffer)
        this.drawBezierCurve({x:240, y:300}, {x:290, y:305}, {x:290, y:230}, {x:210, y:255}, this.num_curve_sections, c, framebuffer)

        //T
        this.drawLine({x:295, y:350}, {x:370, y:350}, c, framebuffer)
        this.drawLine({x:332, y:350}, {x:332, y:250}, c, framebuffer)

        //I
        this.drawCircle({x:400, y:340}, 10, this.num_curve_sections, c, framebuffer)
        this.drawLine({x:400, y:320}, {x:400, y:250}, c, framebuffer)

        //N
        this.drawLine({x:435, y:350}, {x:435, y:250}, c, framebuffer)
        this.drawLine({x:435, y:350}, {x:500, y:250}, c, framebuffer)
        this.drawLine({x:500, y:350}, {x:500, y:250}, c, framebuffer)

        //A
        this.drawLine({x:525, y:250}, {x:562, y:350}, c, framebuffer)
        this.drawLine({x:544, y:300}, {x:581, y:300}, c, framebuffer)
        this.drawLine({x:562, y:350}, {x:600, y:250}, c, framebuffer)

        //Heart
        let vl_list = [{x:700, y:310}, {x:660, y: 350}, {x:680, y:340}, {x:640, y: 340}, {x:630, y:310}, {x:640, y:290}, {x:700, y:240}]
        this.drawConvexPolygon(vl_list, [255,0,0,255], framebuffer)

        let vr_list = [{x:700, y:310}, {x:740, y: 350}, {x:720, y:340}, {x:760, y: 340}, {x:770, y:310}, {x:760, y:290}, {x:700, y:240}]
        this.drawConvexPolygon(vr_list, [255,0,0,255], framebuffer)

    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let t = 0
        let dt = 1 / num_edges
        let current_point = p0
        if(this.show_points){
            this.drawVertex(p0, color, framebuffer)
            this.drawVertex(p0, [0,0,0,255], framebuffer)
            this.drawVertex(p1, [0,0,0,255], framebuffer)
            this.drawVertex(p2, [0,0,0,255], framebuffer)
            this.drawVertex(p3, [0,0,0,255], framebuffer)
        }

        for(let e=0; e<num_edges; e++){
            t += dt;

            //Calculate next point
            let next_x = Math.round((Math.pow(1-t, 3) * p0.x) + (3 * Math.pow(1-t, 2) * t * p1.x) + (3 * (1-t) * Math.pow(t,2) * p2.x) + (Math.pow(t,3) * p3.x));
            let next_y = Math.round((Math.pow(1-t, 3) * p0.y) + (3 * Math.pow(1-t, 2) * t * p1.y) + (3 * (1-t) * Math.pow(t,2) * p2.y) + (Math.pow(t,3) * p3.y));
            let next_point = {x: next_x, y: next_y};
            if (this.show_points){
                this.drawVertex(current_point, color, framebuffer)
            }

            //Draw line between points
            this.drawLine(current_point, next_point, color, framebuffer);

            //Update the current point
            current_point = next_point;
        }  
        if(this.show_points){
            this.drawVertex(current_point, color, framebuffer)
            this.drawVertex(p0, [0,0,0,255], framebuffer)
            this.drawVertex(p1, [0,0,0,255], framebuffer)
            this.drawVertex(p2, [0,0,0,255], framebuffer)
            this.drawVertex(p3, [0,0,0,255], framebuffer)
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let dt = (2 * Math.PI) / num_edges
        let current_point =  {x: center.x + radius, y: center.y}
            if (this.show_points){
                this.drawVertex(current_point, color, framebuffer)
            }

        for (let rad = dt; rad <= (2 * Math.PI); rad += dt){
            let next_x = Math.round(center.x + (radius * Math.cos(rad)))
            let next_y = Math.round(center.y + (radius * Math.sin(rad)))
            let next_point = {x: next_x, y: next_y}
            if (this.show_points){
                this.drawVertex(next_point, color, framebuffer)
            }

            this.drawLine(current_point, next_point, color, framebuffer)

            current_point = next_point
            console.log(rad)
        } 

        //Required to finish circle because of rounding error
        this.drawLine(current_point, {x: center.x + radius, y: center.y}, color, framebuffer)
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        if (this.show_points){
            for(let i=0;i<vertex_list.length;i++){
                this.drawVertex(vertex_list[i], color, framebuffer)
            }
        }
        for (let i=1; i<vertex_list.length-1;i++){
            for (let j=2; j<vertex_list.length;j++){
                this.drawTriangle(vertex_list[0], vertex_list[i], vertex_list[j], color, framebuffer)
            }
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        this.setFramebufferColor(color, v.x, v.y, framebuffer)
        this.setFramebufferColor(color, v.x+1, v.y+1, framebuffer)
        this.setFramebufferColor(color, v.x+2, v.y+2, framebuffer)
        this.setFramebufferColor(color, v.x, v.y+1, framebuffer)
        this.setFramebufferColor(color, v.x, v.y-1, framebuffer)
        this.setFramebufferColor(color, v.x+1, v.y, framebuffer)
        this.setFramebufferColor(color, v.x-1, v.y, framebuffer)
        this.setFramebufferColor(color, v.x-1, v.y+1, framebuffer)
        this.setFramebufferColor(color, v.x-2, v.y+2, framebuffer)
        this.setFramebufferColor(color, v.x+1, v.y-1, framebuffer)
        this.setFramebufferColor(color, v.x+2, v.y-2, framebuffer)
        this.setFramebufferColor(color, v.x-1, v.y-1, framebuffer)
        this.setFramebufferColor(color, v.x-2, v.y-2, framebuffer)
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
