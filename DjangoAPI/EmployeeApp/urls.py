from django.urls import path
from EmployeeApp import views

urlpatterns=[
    path('department',views.departmentApi),
    path('department/<int:id>',views.departmentApi),

    path('employee',views.employeeApi),
    path('employee/<int:id>',views.employeeApi),
    path('employee/<username>',views.employeeApi),

    path('login',views.employeeLogin),

    path('user',views.userApi),
    path('user/<int:id>',views.userApi),
    path('user/<username>',views.userApi),

    path('leave',views.LeaveApi),
    path('leave/<int:id>',views.LeaveApi),
    path('leave/<username>',views.LeaveApi),

    path('attendance',views.attendanceApi),

    path('project',views.projectApi),


    path('token/<username>/<password>',views.token)
]