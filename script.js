const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const size = 8;
const cell = 50;

const start = [0,0];
const goal = [7,7];

const obstacles = [
[3,3],
[4,4],
[2,5],
[5,2]
];

const moves = [
[2,1],[2,-1],[-2,1],[-2,-1],
[1,2],[1,-2],[-1,2],[-1,-2]
];

function drawBoard(){

ctx.clearRect(0,0,400,400);

for(let r=0;r<size;r++){
for(let c=0;c<size;c++){

ctx.strokeRect(c*cell,r*cell,cell,cell);

}
}

for(let o of obstacles){
ctx.fillStyle="black";
ctx.fillRect(o[1]*cell,o[0]*cell,cell,cell);
}

ctx.fillStyle="green";
ctx.fillRect(start[1]*cell,start[0]*cell,cell,cell);

ctx.fillStyle="red";
ctx.fillRect(goal[1]*cell,goal[0]*cell,cell,cell);

}

function valid(x,y){

if(x<0 || y<0 || x>=8 || y>=8) return false;

for(let o of obstacles){
if(o[0]==x && o[1]==y) return false;
}

return true;

}

/* BFS */

function bfs(){

let queue=[[start,[start]]];
let visited=new Set();

while(queue.length){

let [pos,path]=queue.shift();
let key=pos.toString();

if(visited.has(key)) continue;
visited.add(key);

if(pos[0]==goal[0] && pos[1]==goal[1]){
return path;
}

for(let m of moves){

let nx=pos[0]+m[0];
let ny=pos[1]+m[1];

if(valid(nx,ny)){
queue.push([[nx,ny],[...path,[nx,ny]]]);
}

}

}

return null;

}

/* DFS */

function dfs(){

let stack=[[start,[start]]];
let visited=new Set();

while(stack.length){

let [pos,path]=stack.pop();
let key=pos.toString();

if(visited.has(key)) continue;
visited.add(key);

if(pos[0]==goal[0] && pos[1]==goal[1]){
return path;
}

for(let m of moves){

let nx=pos[0]+m[0];
let ny=pos[1]+m[1];

if(valid(nx,ny)){
stack.push([[nx,ny],[...path,[nx,ny]]]);
}

}

}

return null;

}

/* Heuristic */

function heuristic(x,y){
return Math.abs(x-goal[0]) + Math.abs(y-goal[1]);
}

/* Greedy Search */

function greedy(){

let open=[[start,[start]]];
let visited=new Set();

while(open.length){

open.sort((a,b)=>heuristic(a[0][0],a[0][1]) - heuristic(b[0][0],b[0][1]));

let [pos,path]=open.shift();
let key=pos.toString();

if(visited.has(key)) continue;
visited.add(key);

if(pos[0]==goal[0] && pos[1]==goal[1]){
return path;
}

for(let m of moves){

let nx=pos[0]+m[0];
let ny=pos[1]+m[1];

if(valid(nx,ny)){
open.push([[nx,ny],[...path,[nx,ny]]]);
}

}

}

return null;

}

/* A* Search */

function aStar(){

let open=[[start,[start],0]];
let visited=new Set();

while(open.length){

open.sort((a,b)=>(a[2]+heuristic(a[0][0],a[0][1]))-(b[2]+heuristic(b[0][0],b[0][1])));

let [pos,path,cost]=open.shift();
let key=pos.toString();

if(visited.has(key)) continue;
visited.add(key);

if(pos[0]==goal[0] && pos[1]==goal[1]){
return path;
}

for(let m of moves){

let nx=pos[0]+m[0];
let ny=pos[1]+m[1];

if(valid(nx,ny)){
open.push([[nx,ny],[...path,[nx,ny]],cost+1]);
}

}

}

return null;

}

/* Draw Path */

function drawPath(path){

drawBoard();

if(!path) return;

ctx.strokeStyle="blue";
ctx.lineWidth=3;

ctx.beginPath();

for(let i=0;i<path.length;i++){

let x=path[i][1]*cell+cell/2;
let y=path[i][0]*cell+cell/2;

if(i==0) ctx.moveTo(x,y);
else ctx.lineTo(x,y);

}

ctx.stroke();

}

/* Run Functions */

function runBFS(){
let path=bfs();
drawPath(path);
}

function runDFS(){
let path=dfs();
drawPath(path);
}

function runGreedy(){
let path=greedy();
drawPath(path);
}

function runAStar(){
let path=aStar();
drawPath(path);
}

drawBoard();
