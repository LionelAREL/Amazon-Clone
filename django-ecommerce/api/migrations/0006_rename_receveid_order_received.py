# Generated by Django 4.0.4 on 2022-10-10 00:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_address_country'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='receveid',
            new_name='received',
        ),
    ]
