# Generated by Django 4.1.13 on 2024-09-24 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('UserId', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=500)),
                ('password', models.CharField(max_length=500)),
                ('role', models.CharField(max_length=500)),
                ('firstName', models.CharField(max_length=500)),
                ('lastName', models.CharField(max_length=500)),
                ('emailId', models.CharField(max_length=500)),
                ('status', models.CharField(max_length=500)),
            ],
        ),
    ]
