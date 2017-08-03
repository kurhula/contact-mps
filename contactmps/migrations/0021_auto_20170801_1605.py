# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-01 16:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contactmps', '0020_auto_20170801_1548'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='load_all_persons',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='campaign',
            name='load_neglected_persons',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='campaign',
            name='single_recipient',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contactmps.Person'),
        ),
    ]
