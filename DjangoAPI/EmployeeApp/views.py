from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from .utils import generate_jwt_token,check_jwt_token

from EmployeeApp.models import Departments,Employees,Users, Attendance,LeaveRequest ,Projects
from EmployeeApp.serializers import DepartmentSerializers,EmployeeSerializer,UserSerializers,AttendanceSerializers,LeaveRequestSerializers,ProjectSerializers

# Create your views here.
@csrf_exempt
@check_jwt_token
def departmentApi(request,id=0):
    if request.method== 'GET':
        if id!=0:
            department=Departments.objects.get(DepartmentId=id)
            departments_serializer=DepartmentSerializers(department,many=False)
            return JsonResponse(departments_serializer.data,safe=False)
        else:
            departments = Departments.objects.all()
            departments_serializer = DepartmentSerializers(departments,many=True)
            return JsonResponse(departments_serializer.data,safe=False) 
    elif request.method == 'POST':
        dept_data=JSONParser().parse(request)
        departments_serializer=DepartmentSerializers(data=dept_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Added SuccessFully",safe=False)
        return JsonResponse("Failed to Add Department",safe=False)
    elif request.method == 'PUT':
        dept_data= JSONParser().parse(request)
        db_data=Departments.objects.get(DepartmentId=dept_data['DepartmentId'])
        departments_serializer=DepartmentSerializers(db_data,data=dept_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Department Updated successfully",safe=False)
        return JsonResponse("Failed to update",safe=False)
    elif request.method == 'DELETE':
        department =Departments.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse("Department Deleted Successfully",safe=False)
    
@check_jwt_token
@csrf_exempt
def employeeApi(request,id=0,username="undefined"):
    if request.method=='GET':
        try:
            if id!=0:
                employee=Employees.objects.get(EmployeeId=id)
                employees_serializer=EmployeeSerializer(employee,many=False)
                return JsonResponse(employees_serializer.data,safe=False)
            elif username!='undefined':
                employee=Employees.objects.filter(Manager=username)
                employees_serializer=EmployeeSerializer(employee,many=True)
                return JsonResponse(employees_serializer.data,safe=False)
            else :
                employees=Employees.objects.all()
                employees_serializer=EmployeeSerializer(employees,many=True)
                return JsonResponse(employees_serializer.data,safe=False)
            
        except Employees.DoesNotExist:
            return JsonResponse({"message":"User Not found!"},safe=False)
        except Exception as e:
            return JsonResponse({"message":str(e)},safe=False)
    elif request.method == 'POST':
        employee=JSONParser().parse(request)
        employees_serializer=EmployeeSerializer(data=employee)
        if employees_serializer.is_valid():
            employee_saved= employees_serializer.save()
            return JsonResponse(employees_serializer.data,safe=False)
        return JsonResponse("Failed to Add Employee",safe=False)
    elif request.method == 'PUT':
        try:
            employee_id = request.headers.get('EmployeeId')
            employee=Employees.objects.get(EmployeeId=employee_id)
            if employee_id == None:
                employee=JSONParser().parse(request)
                db_emp=Employees.objects.get(EmployeeId=employee["EmployeeId"])
                employees_serializer=EmployeeSerializer(db_emp,data=employee)
                if employees_serializer.is_valid():
                    employees_serializer.save()
                    return JsonResponse("Employee Updated Successfully",safe=False)
                return JsonResponse("Failed to update the Employee",safe=False)
            else :
                if employee.Role == 'Manager':
                    employee=JSONParser().parse(request)
                    db_emp=Employees.objects.get(EmployeeId=employee["EmployeeId"])
                    employees_serializer=EmployeeSerializer(db_emp,data=employee)
                    if employees_serializer.is_valid():
                        employees_serializer.save()
                        return JsonResponse("Project Assigned to the Employee",safe=False)
                    return JsonResponse("Failed to Assign the Employee",safe=False)
        except Employees.DoesNotExist:
            return JsonResponse({"message":"User Not found!"},safe=False)
        except Exception as e:
            return JsonResponse({"message":str(e)},safe=False)
    elif request.method == 'DELETE':
        employee=Employees.objects.get(EmployeeId=id)
        employee.delete()
        return JsonResponse("Employee Deleted Successfully",safe=False)

@check_jwt_token
@csrf_exempt
def employeeLogin(request):
    if request.method == 'POST':
        employee_cred=JSONParser().parse(request)
        email = employee_cred.get('Email')
        password = employee_cred.get('Password')
        
        employee = Employees.objects.filter(Email=email).first()

        if employee:
            employees_serializer=EmployeeSerializer(employee)
            if employee.Password==password:
                return JsonResponse({"message": "Login successful","employee": employees_serializer.data}, safe=False)
            return JsonResponse(
            {"message": "Invalid credentials"}, 
            status=401, 
            safe=False
        )
      

@check_jwt_token
@csrf_exempt
def userApi(request,id=0,username="undefined"):
    userid=request.user['UserId']
    if request.method=='GET':
        try:
            if id!=0:
                user=Users.objects.get(UserId=id)
                users_serializer=UserSerializers(user,many=False)
                return JsonResponse(users_serializer.data, safe=False)
            elif username!="undefined":
                user=Users.objects.get(username=username)
                users_serializer=UserSerializers(user,many=False)
                return JsonResponse(users_serializer.data, safe=False)
            else:
                users=Users.objects.all()
                users_serializer=UserSerializers(users,many=True)
                return JsonResponse(users_serializer.data, safe=False)
        except Users.DoesNotExist:
            return JsonResponse({"message":"User Not found!"},safe=False)
        except Exception as e:
            return JsonResponse({"message":str(e)},safe=False)
    elif request.method=='POST':
        user=JSONParser().parse(request)
        user_serializer=UserSerializers(data=user)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("User Added Successfully",safe=False)
        return JsonResponse("Failed to Add User",safe=False)
    elif request.method == "PUT":
        try:
            if id!=0:
                if (Users.objects.get(UserId=id).role == 'admin'):
                    user=JSONParser().parse(request)
                    db_user=Users.objects.get(UserId=user["UserId"])
                    user_serializer=UserSerializers(db_user,data=user)
                    if user_serializer.is_valid():
                        user_serializer.save()
                        return JsonResponse({"message":"User updated successfully"},safe=False)
                    return JsonResponse({"message":"Failed to update the user"},safe=False)
                return JsonResponse({"message":"You need to be admin to update the user!"},safe=False)
        except Users.DoesNotExist:
            return JsonResponse({"message":"User Not found!"},safe=False)
        except Exception as e:
            return JsonResponse({"message":str(e)},safe=False)
    elif request.method == "DELETE":
        try:
            if userid!=0:
                if (Users.objects.get(UserId=userid).role == 'admin'):
                    if id!=0:
                        user=Users.objects.get(UserId=id)
                        user.delete()
                        return JsonResponse({"message":"User deleted successfully!"},safe=False)
                    return JsonResponse({"message":"please mention the userId to delete"},safe=False)
                return JsonResponse({"message":"You need to be admin to delete the user!"},safe=False)
        except Users.DoesNotExist:
            return JsonResponse({"message":"User Not found!"},safe=False)
        except Exception as e:
            return JsonResponse({"message":str(e)},safe=False)

@check_jwt_token
@csrf_exempt
def LeaveApi(request,id=0,username="undefined"):
    try:
        employee_id = request.headers.get('EmployeeId')
        if not employee_id:
            return JsonResponse("EmployeeId not found in headers", safe=False, status=400)
        employee=Employees.objects.get(EmployeeId=employee_id)

        if request.method == 'POST':
            leave=JSONParser().parse(request)
            leave['EmployeeName']=employee.EmployeeName
            leave['ReportingManager']=employee.Manager
            leave_serializer=LeaveRequestSerializers(data=leave)
            if leave_serializer.is_valid():
                leave_serializer.save()
                return JsonResponse("Leave Request created successfully",safe=False)
            return JsonResponse("Failed to create a leave request",safe=False)
        elif request.method == 'GET':
            if employee.Role == 'Manager':
                leaves=LeaveRequest.objects.filter(ReportingManager=employee.EmployeeName)
                leave_serializer=LeaveRequestSerializers(leaves,many=True)
                return JsonResponse(leave_serializer.data,safe=False)
            else:
                leaves=LeaveRequest.objects.filter(EmployeeName=employee.EmployeeName)
                leave_serializer=LeaveRequestSerializers(leaves,many=True)
                return JsonResponse(leave_serializer.data,safe=False)
        elif request.method == 'PUT':
            if employee.Role == 'Manager':
                leave=JSONParser().parse(request)
                db_leave=LeaveRequest.objects.get(LeaveId=leave['LeaveId'],ReportingManager=employee.EmployeeName)
                leave_serializer=LeaveRequestSerializers(db_leave,data=leave)
                if leave_serializer.is_valid():
                    leave_serializer.save()
                    return JsonResponse("Updated the status of leave Request",safe=False)
            return JsonResponse("You need to be a Manager to access the resource",safe=False)
    except Employees.DoesNotExist:
        return JsonResponse({"message":"User Not found!"},safe=False)
    except Exception as e:
        return JsonResponse({"message":str(e)},safe=False)  


@check_jwt_token
@csrf_exempt
def attendanceApi(request,id=0,username="undefined"):
    if request.method=='GET':
        print('inside Get')
        # try:
        #     if id!=0:
        #         user=Users.objects.get(UserId=id)
        #         users_serializer=UserSerializers(user,many=False)
        #         return JsonResponse(users_serializer.data, safe=False)
        #     elif username!="undefined":
        #         user=Users.objects.get(username=username)
        #         users_serializer=UserSerializers(user,many=False)
        #         return JsonResponse(users_serializer.data, safe=False)
        #     else:
        #         users=Users.objects.all()
        #         users_serializer=UserSerializers(users,many=True)
        #         return JsonResponse(users_serializer.data, safe=False)
        # except Users.DoesNotExist:
        #     return JsonResponse({"message":"User Not found!"},safe=False)
        # except Exception as e:
        #     return JsonResponse({"message":str(e)},safe=False)
    elif request.method=='POST':
        attendance=JSONParser().parse(request)
        attendance_serializer=AttendanceSerializers(data=attendance)
        if attendance_serializer.is_valid():
            attendance_serializer.save()
            return JsonResponse("User Added Successfully",safe=False)
        return JsonResponse("Failed to Add User",safe=False)


@check_jwt_token
@csrf_exempt
def projectApi(request,id=0,username="undefined"):
    try:
        if request.method == 'POST':
            project=JSONParser().parse(request)
            project_serializer=ProjectSerializers(data=project)
            if project_serializer.is_valid():
                project_serializer.save()
                return JsonResponse("Project Registered Successfully",safe=False)
            return JsonResponse("Failed to register the project",safe=False)
    except Employees.DoesNotExist:
        return JsonResponse({"message":"User Not found!"},safe=False)
    except Exception as e:
        return JsonResponse({"message":str(e)},safe=False) 
   

@api_view(['GET'])
def token(request,username="undefined",password="undefined"):
    if request.method=='GET':
        if username != 'undefined':
            user=Users.objects.get(username=username)
            if user.password == password:
                token = generate_jwt_token(user)
                return JsonResponse({'token': token}, status=200)
            else:
                return JsonResponse("Invalid Credentials")
        else:
            return JsonResponse("please provide username and password")



