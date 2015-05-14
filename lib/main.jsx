let element = document.getElementById('text');
let i = 0;
setInterval(() => {
    element.innerHTML = "Hello" + (i++);
    console.log('Hello World');
}, 30);
