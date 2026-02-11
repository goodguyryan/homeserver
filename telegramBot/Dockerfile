FROM python:3.14
WORKDIR /app

#Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#Copy App code
COPY main.py .
COPY expenses.py .
COPY gambling.py .
COPY menu.py .

#Run the application
CMD ["python", "main.py"]