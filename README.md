# Python-Projects

### Prerequisites:
 ```bash
 Python 3.x
 MongoDB
 Virtual environment (optional but recommended)      
  ```
### Project SetUp :
1. Clone the repository:

   ```bash
   git clone https://github.com/Ameyht/Python-Projects.git 
   ```
   
   - Make sure you have Python installed on your local machine.
   - 
2. Navigate to the project's root directory:

   ```bash
   cd DjangoAPI
   ```
3. Set up a Virtual Environment:

   ```bash
   python -m venv env
   ```
   
   ```bash
   source env/bin/activate
   ```
4. Install MongoDB and Djongo:

   ```bash
   pip install djongo==1.3.6
   ```

5. Run migrations :

   ```bash
   python3 manage.py makemigrations
   ```
   
   ```bash
   python3 manage.py migrate
   ```

6. Run the Project using following command ::

   ```bash
   python3 manage.py startapp EmployeeApApp
   ```
  OR 
   ```bash
   python3 manage.py runserver
   ```

