
## Get started:

### Stack Used
* ReactJS + React-Boostrap
* Django + DRF
* SQlite


### Back end:
1. Clone the repo and cd into rest_api/
2. Create a virtual environment and install requirements

        pip install -r requiremenets.txt

3. Run migrations 

        python manage.py migrate

3. Seed the database with initial data

        python manage.py loaddata antique.json auction.json auction_item.json
        
4. Run python manage.py runserver to start the Django server

### Front end
5. cd into react_app/
6. Run npm install 
7. Run npm start
18. Visit localhost://3000 and login

### Login credentials
* user1
* user2
No password is required