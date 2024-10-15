from django.db import models

class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=500)

class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=500)
    Department = models.CharField(max_length=500)
    DateOfJoining = models.DateField()
    Role=models.CharField(max_length=500)
    Manager=models.CharField(max_length=500,default="Unknown")
    ProjectId = models.BigIntegerField()
    Email=models.CharField(max_length=500)
    Password = models.CharField(max_length=500)

class Users(models.Model):
    UserId = models.AutoField(primary_key=True)
    username=models.CharField(max_length=500)
    password=models.CharField(max_length=500)
    role=models.CharField(max_length=500)
    firstName=models.CharField(max_length=500)
    lastName=models.CharField(max_length=500)
    emailId=models.CharField(max_length=500)
    phoneNumber=models.BigIntegerField()
    status=models.CharField(max_length=500)

class LeaveRequest(models.Model):
    LeaveId=models.AutoField(primary_key=True)
    EmployeeName=models.CharField(max_length=500)
    LeaveDate = models.DateField()
    Reason=models.CharField(max_length=500)
    Status=models.CharField(max_length=500)
    ReportingManager=models.CharField(max_length=500)


class Attendance(models.Model):
    AttendanceId = models.AutoField(primary_key=True)
    Status=models.CharField(max_length=500)

class Projects(models.Model):
    ProjectId=models.AutoField(primary_key=True)
    ProjectName=models.CharField(max_length=500)
    ReportingManager=models.CharField(max_length=500)
    Origin=models.CharField(max_length=500)
    StartedDate = models.DateField()
    Requirements=models.CharField(max_length=500)
    WorkingEmployeeIds = models.JSONField(default=list)