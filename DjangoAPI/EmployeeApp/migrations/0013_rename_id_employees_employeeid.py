# Generated by Django 4.1.13 on 2024-11-07 07:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0012_rename_employeeid_employees_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employees',
            old_name='id',
            new_name='EmployeeId',
        ),
    ]
