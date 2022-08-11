from fastapi.testclient import TestClient
from ..index import app

client = TestClient(app)

def test_always_passes():
	assert True
