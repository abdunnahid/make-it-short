const rippleBtns = document.querySelectorAll(".mtrl-btn-ripple");
function animate(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var w = this.offsetWidth,
        h = this.offsetHeight;
    w = Math.max(w, h);
    var ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = w + "px";
    ripple.style.left = x - w / 2 + "px";
    ripple.style.top = y - w / 2 + "px";
    this.appendChild(ripple);
    setTimeout(function () {
        var ri = document.querySelector(".ripple");
        ri.parentElement.removeChild(ri)
    }, 300);
}
rippleBtns.forEach(link => link.addEventListener("mousedown", animate));