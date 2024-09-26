from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from .utils import generate_jwt_token,check_jwt_token

from EmployeeApp.models import Departments,Employees,Users
from EmployeeApp.serializers import DepartmentSerializers,EmployeeSerializer,UserSerializers

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
def employeeApi(request,id=0):
    if request.method=='GET':
        try:
            if id!=0:
                employee=Employees.objects.get(EmployeeId=id)
                employees_serializer=EmployeeSerializer(employee,many=False)
                return JsonResponse(employees_serializer.data,safe=False)
            else:
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
            employees_serializer.save()
            return JsonResponse("Employee Added Successfully",safe=False)
        return JsonResponse("Failed to Add Employee",safe=False)
    elif request.method == 'PUT':
        try:    
            employee=JSONParser().parse(request)
            db_emp=Employees.objects.get(EmployeeId=employee["EmployeeId"])
            employees_serializer=EmployeeSerializer(db_emp,data=employee)
            if employees_serializer.is_valid():
                employees_serializer.save()
                return JsonResponse("Employee Updated Successfully",safe=False)
            return JsonResponse("Failed to update the Employee",safe=False)
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



