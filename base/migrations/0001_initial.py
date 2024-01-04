# Generated by Django 5.0 on 2024-01-02 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.CharField(max_length=30)),
                ('category', models.CharField(max_length=30)),
                ('isUber', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('season', models.CharField(default='base', max_length=30)),
            ],
        ),
    ]
