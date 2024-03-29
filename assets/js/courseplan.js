var plans = {
    gbc:"../test/assets/py/Degree-plans-9/gbc.txt",
    mbc:"../test/assets/py/Degree-plans-9/mbc.txt",
    sbc:"../test/assets/py/Degree-plans-9/sbc.txt",
    sca:"../test/assets/py/Degree-plans-9/sca.txt",
    scm:"../test/assets/py/Degree-plans-9/scm.txt",
    sco:"../test/assets/py/Degree-plans-9/sco.txt",
    scs:"../test/assets/py/Degree-plans-9/scs.txt",
    ssd:"../test/assets/py/Degree-plans-9/ssd.txt",
    gba:"../test/assets/py/Degree-plans-9/gba.txt"
};

document.getElementById("degreePlanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var so = document.getElementById("degreePlanSelect").value;
    var soname = document.getElementById(so).text;
    document.getElementById("selectedPlan").textContent = soname;
    var treemap = plans[so];
    document.getElementById("courseMapLink").href = treemap;
});




