# Generated by Django 5.0.6 on 2024-05-11 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sme', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sme',
            name='yoe',
        ),
        migrations.AddField(
            model_name='sme',
            name='year',
            field=models.IntegerField(default=2000),
        ),
    ]