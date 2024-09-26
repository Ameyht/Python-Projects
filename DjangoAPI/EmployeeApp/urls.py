from django.urls import path
from EmployeeApp import views

urlpatterns=[
    path('department',views.departmentApi),
    path('department/<int:id>',views.departmentApi),

    path('employee',views.employeeApi),
    path('employee/<int:id>',views.employeeApi),

    path('user',views.userApi),
    path('user/<int:id>',views.userApi),
    path('user/<username>',views.userApi),


    path('token/<username>/<password>',views.token)
]