function addword(s) {
    return "Hello, this is your plan: " + String(s);
}

class CourseTreeNode {
    constructor(name) {
        this.name = name;
        this.children = [];
    }
    add_child(child) {
        this.children.push(child);
    }
}

class CoursePlanTree {
    constructor(name) {
        this.root = new CourseTreeNode(name);
        this.chosen_courses = [];
    }
    print_tree(node, level=0) {
        if (node) {
            if (Array.isArray(node.name)) {
                for (let i of node.name) {
                    if (typeof i === 'string') {
                        console.log("  ".repeat(level) + `${i}`);
                    } else {
                        this.print_tree(i, level);
                    }
                }
                console.log("  ".repeat(level) + "===========================================");
            } else {
                console.log("  ".repeat(level) + `${node.name}:`);
                for (let child of node.children) {
                    this.print_tree(child, level + 1);
                }
            }
        }
    }
    
    create_plan(plan_name, stages) {
        let plan_node = new CourseTreeNode(plan_name);
        for (let [stage_name, courses] of Object.entries(stages)) {
            let stage_node = new CourseTreeNode(stage_name);
            
            let coursesPlan = Array.from(itertools.combinations(courses["list"], courses["num"]));
            for (let plan of coursesPlan) {
                
                if (typeof plan[0] === 'string') {
                    let course_node = new CourseTreeNode(plan);
                    stage_node.add_child(course_node);
                
                } else if (typeof plan[0] === 'object') {
                    let subplanset = [];
                    for (let i = 0; i < plan.length; i++) {
                        subplanset.push(this.create_plan(plan[i - 1]["name"], plan[i - 1]["subplan"]));
                    }
                    let subplan_node = new CourseTreeNode(subplanset);
                    stage_node.add_child(subplan_node);
                }
            }
            plan_node.add_child(stage_node);
        }
        return plan_node;
    }
    
    add_plan(plan_name, stages) {
        let plan_node = this.create_plan(plan_name, stages);
        this.root.add_child(plan_node);
    }
    
    enroll_course(chosen_courses, course_name) {
        const fs = require('fs');
        const course_data = JSON.parse(fs.readFileSync('course.json', 'utf8'));
        
        let course_exists = false;
        for (let course of course_data['courses']) {
            if (course['name'] === course_name) {
                course_exists = true;
                let pre_list = course['pre'].split(', ');
                let exc_list = course['exclusion'].split(', ');
                break;
            }
        }
        if (!course_exists) {
            return "Course not exists";
        }
        console.log("Pre-requisite courses:", pre_list);
        console.log("Exclusion courses:", exc_list);
        console.log("Chosen courses:", chosen_courses);
        
        if (pre_list.every(course => chosen_courses.includes(course))) {
            if (exc_list.length > 0 && exc_list.some(course => chosen_courses.includes(course))) {
                return "Enroll failed due to course exclusion";
            }
            chosen_courses.push(course_name);
            return "Enroll success";
        } else {
            return "Enroll failed due to missing prerequisites";
        }
    }
    
    print_chosen_courses(chosen_courses) {
        console.log("Chosen Courses:");
        for (let course of chosen_courses) {
            console.log(course);
        }
    }
}

function convertTreeToText(tree) {
    let text = "";

    function traverseNode(node, level = 0) {
        if (node) {
            // Indentation for better readability
            let indent = " ".repeat(level * 2);

            if (Array.isArray(node.name)) {
                for (let i of node.name) {
                    if (typeof i === 'string') {
                        text += indent + i + "\n";
                    } else {
                        traverseNode(i, level);
                    }
                }
                text += indent + "===========================================\n";
            } else {
                text += indent + node.name + ":\n";
                node.children.forEach(child => traverseNode(child, level + 1));
            }
        }
    }

    traverseNode(tree.root);
    return text;
}




document.getElementById("degreePlanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var so = document.getElementById("degreePlanSelect").value;
    document.getElementById("selectedPlan").textContent = so;

    let stagesData = {
        "1A": {"list": ["CISC121", "CISC124"], "num": 2},
        "1B": {"list": ["CISC203", "CISC204", "CISC221", "CISC235"], "num": 4},
        "2A":{"list":["CISC320", "CISC322", "CISC324", "CISC325", "CISC326", "CISC327", "CISC330", "CISC332", "CISC335", "CISC340", "CISC351", "CISC352", "CISC360", "CISC365", "CISC371", "CISC372", 
        "CISC422", "CISC423", "CISC425", "CISC426", "CISC432", "CISC434", "CISC437", "CISC447", "CISC448", "CISC451", "CISC452", "CISC453", "CISC454", "CISC455", "CISC457", "CISC456", "CISC457", "CISC458", "CISC462", "CISC465", "CISC466", "CISC467", "CISC468", "CISC471", "CISC472", "CISC473", "CISC474", "CISC486", "CISC490", "CISC498", "CISC499", 
        "CISC500", 
        "COMM365", "ELEC470", "MATH337", "MATH401", "MATH402", "MATH434", "MATH474", 
        "COGS300", "COGS400", "COGS499"], "num":1},
        "2B": {"list": ["COGS100", 
        "CISC203", "CISC204", "CISC220", "CISC221", "CISC223", "CISC226", "CISC235", "CISC251", "CISC271", "CISC282", 
        "CISC320", "CISC322", "CISC324", "CISC325", "CISC326", "CISC327", "CISC330", "CISC332", "CISC335", "CISC340", "CISC351", "CISC352", "CISC360", "CISC365", "CISC371", "CISC372", 
        "CISC422", "CISC423", "CISC425", "CISC426", "CISC432", "CISC434", "CISC437", "CISC447", "CISC448", "CISC451", "CISC452", "CISC453", "CISC454", "CISC455", "CISC457", "CISC456", "CISC457", "CISC458", "CISC462", "CISC465", "CISC466", "CISC467", "CISC468", "CISC471", "CISC472", "CISC473", "CISC474", "CISC486", "CISC490", "CISC498", "CISC499", 
        "CISC500", 
        "COMM365", "ELEC470","MATH272", "MATH337", "MATH401", "MATH402", "MATH434", "MATH474", 
        "COCA201", 
        "COGS201", "COGS300", "COGS400", "COGS499"], "num": 3},
        "3A": {"list": ["CISC102", "MATH110"], "num": 1}
      };
      
    const course_tree = new CoursePlanTree("Queen's Computing");
    course_tree.add_plan(so.toString(), stagesData);
    let courseMapText = convertTreeToText(course_tree);
    document.getElementById("courseMap").textContent = courseMapText;
});
