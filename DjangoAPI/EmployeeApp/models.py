from django.db import models

# Create your models here.

class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=500)

class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=500)
    Department = models.CharField(max_length=500)
    DateOfJoining = models.DateField()
    PhotoFileName = models.CharField(max_length=500)

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

