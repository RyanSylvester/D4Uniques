import pandas as pd
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'uniquesback.settings')
django.setup()
from base.models import Item

def import_items_from_csv(csv_file):
    # Clear all items
    Item.objects.all().delete()
    
    # Define the column names
    column_names = ['name', 'character', 'category', 'isUber', 'season']

    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file, names=column_names)

    # Iterate over the rows of the DataFrame
    for index, row in df.iterrows():
        # Create a new Item object and save it to the database
        item = Item(name=row['name'], character=row['character'], category=row['category'], isUber=bool(row['isUber']), season=row['season'])
        item.save()

# Usage
csv_file = 'data/items.csv'
import_items_from_csv(csv_file)