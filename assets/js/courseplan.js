var plans = {
    gbc:"assets/py/Degree-plans-9/gbc.txt",
    mbc:"assets/py/Degree-plans-9/mbc.txt",
    sbc:"assets/py/Degree-plans-9/sbc.txt",
    sca:"assets/py/Degree-plans-9/sca.txt",
    scm:"assets/py/Degree-plans-9/scm.txt",
    sco:"assets/py/Degree-plans-9/sco.txt",
    scs:"assets/py/Degree-plans-9/scs.txt",
    ssd:"assets/py/Degree-plans-9/ssd.txt",
    gba:"assets/py/Degree-plans-9/gba.txt"
};

document.getElementById("degreePlanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var so = document.getElementById("degreePlanSelect").value;
    var soname = document.getElementById(so).text;
    document.getElementById("selectedPlan").textContent = soname;
    var treemap = plans[so];
    document.getElementById("courseMapLink").href = treemap;
});




