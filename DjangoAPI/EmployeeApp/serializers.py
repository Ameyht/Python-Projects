from rest_framework import serializers
from EmployeeApp.models import Departments,Employees, Users, Attendance, LeaveRequest,Projects

class DepartmentSerializers(serializers.ModelSerializer):
    class Meta:
        model=Departments
        fields=('DepartmentId','DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employees
        fields=('EmployeeId','EmployeeName','Department','DateOfJoining','PhotoFileName','Role','Manager','ProjectId')

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=('UserId','username','password','role','firstName','lastName','emailId','phoneNumber','status')

class LeaveRequestSerializers(serializers.ModelSerializer):
    class Meta:
        model=LeaveRequest
        fields=('LeaveId','EmployeeName','LeaveDate','Reason','Status','ReportingManager')

class AttendanceSerializers(serializers.ModelSerializer):
    class Meta:
        model=Attendance
        fields=('AttendanceId','Status')

class ProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model=Projects
        fields=('ProjectId','ProjectName','ReportingManager','Origin','StartedDate','Requirements','WorkingEmployeeIds')
