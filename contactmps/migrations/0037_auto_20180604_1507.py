# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-06-04 15:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contactmps', '0036_email_is_endorsed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='email',
            old_name='is_endorsed',
            new_name='moderation_passed',
        ),
    ]
