from rest_framework import serializers
from EmployeeApp.models import Departments,Employees, Users

class DepartmentSerializers(serializers.ModelSerializer):
    class Meta:
        model=Departments
        fields=('DepartmentId','DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employees
        fields=('EmployeeId','EmployeeName','Department','DateOfJoining','PhotoFileName')

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=('UserId','username','password','role','firstName','lastName','emailId','phoneNumber','status')
