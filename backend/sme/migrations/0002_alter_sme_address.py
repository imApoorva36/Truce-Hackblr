# Generated by Django 5.0.3 on 2024-05-12 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sme', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sme',
            name='address',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
