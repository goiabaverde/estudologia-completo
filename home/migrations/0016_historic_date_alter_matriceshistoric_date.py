# Generated by Django 4.2.2 on 2024-01-07 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_historic_date_alter_matriceshistoric_determinant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matriceshistoric',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
