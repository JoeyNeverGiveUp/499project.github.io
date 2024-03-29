import json
import itertools


class CourseTreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child):
        self.children.append(child)


class CoursePlanTree:
    def __init__(self, name):
        self.root = CourseTreeNode(name)
        self.chosen_courses = []

    def print_tree(self, node, level=0):
        if node:
            if isinstance(node.name, tuple):
                for i in node.name:
                    if isinstance(i, str):
                        print("  " * level + f"{i}")
                    else:
                        self.print_tree(i, level)
                print("  " * level + "===========================================")
            else:
                print("  " * level + f"{node.name}:")
                for child in node.children:
                    self.print_tree(child, level + 1)

    # 更新（lxd）

    def create_plan(self, plan_name, stages):
        plan_node = CourseTreeNode(plan_name)

        for stage_name, courses in stages.items():
            stage_node = CourseTreeNode(stage_name)
            # 用于得到一个课程表选X节课的所有可能（lxd）
            coursesPlan = list(itertools.combinations(courses["list"], courses["num"]))
            for plan in coursesPlan:
                # 如果plan是tree的leaf（lxd）
                if isinstance(plan[0], str):
                    course_node = CourseTreeNode(plan)
                    stage_node.add_child(course_node)

                # 如果存在sub plan（lxd）
                elif isinstance(plan[0], dict):
                    subplanset = ()
                    for i in range(len(plan)):
                        subplanset = subplanset + (self.create_plan(plan[i - 1]["name"], plan[i - 1]["subplan"]),)
                    subplan_node = CourseTreeNode(subplanset)
                    stage_node.add_child(subplan_node)
            plan_node.add_child(stage_node)
        return plan_node

    def add_plan(self, plan_name, stages):
        plan_node = self.create_plan(plan_name, stages)
        self.root.add_child(plan_node)

    def enroll_course(self, chosen_courses, course_name):
        with open('course.json') as json_file:
            course_data = json.load(json_file)

        # Check if course exists
        course_exists = False
        for course in course_data['courses']:
            if course['name'] == course_name:
                course_exists = True
                pre_list = course['pre'].split(', ')
                exc_list = course['exclusion'].split(', ')
                break

        if not course_exists:
            return "Course not exists"

        print("Pre-requisite courses:", pre_list)
        print("Exclusion courses:", exc_list)
        print("Chosen courses:", chosen_courses)

        # Check prerequisites
        if all(course in pre_list for course in chosen_courses):
            if exc_list and any(course in chosen_courses for course in exc_list):
                return "Enroll failed due to course exclusion"

            chosen_courses.append(course_name)
            return "Enroll success"
        else:
            return "Enroll failed due to missing prerequisites"

    def print_chosen_courses(self, chosen_courses):
        print("Chosen Courses:")
        for course in chosen_courses:
            print(course)



def main(p):
    # Create the course plan tree
    course_tree = CoursePlanTree("\033[36mQueen's Computing\033[0m")
    # Add a plan
    names = 'Degree-plans-9/'+str(p)+'.json'
    with open(names, 'r') as file:
        stages = json.load(file)

    course_tree.add_plan(str(p), stages)
    # Print the tree
    return course_tree.print_tree(course_tree.root)
