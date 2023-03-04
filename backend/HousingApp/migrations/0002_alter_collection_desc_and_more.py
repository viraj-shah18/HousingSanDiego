# Generated by Django 4.1.7 on 2023-03-01 07:23

import HousingApp.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('HousingApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='desc',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='collection',
            name='properties_list',
            field=djongo.models.fields.EmbeddedField(blank=True, model_container=HousingApp.models.Collection_Object, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='collections',
            field=djongo.models.fields.ArrayField(blank=True, model_container=HousingApp.models.Collection, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='friends',
            field=djongo.models.fields.ArrayField(blank=True, model_container=HousingApp.models.Friend, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_info',
            field=djongo.models.fields.EmbeddedField(blank=True, model_container=HousingApp.models.Profile_Info, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='social_info',
            field=djongo.models.fields.EmbeddedField(blank=True, model_container=HousingApp.models.Social_Info, null=True),
        ),
    ]