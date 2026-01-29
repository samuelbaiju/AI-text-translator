import requests

def test_translate():
    url = "http://localhost:8000/translate"
    data = {"text": "Hello, world!", "target_language": "es"}
    response = requests.post(url, json=data)
    assert response.status_code == 200
    print("Response:", response.json())

if __name__ == "__main__":
    test_translate()
