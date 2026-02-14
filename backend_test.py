#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class HacksGuideAPITester:
    def __init__(self, base_url="https://84b207b3-03a1-4e63-9d99-eb40fce48e0e.preview.emergentagent.com"):
        self.base_url = base_url.rstrip('/')
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def log_result(self, test_name, success, details=None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name}: PASSED")
        else:
            print(f"❌ {test_name}: FAILED")
            if details:
                print(f"   Details: {details}")
        
        self.results.append({
            "test": test_name,
            "success": success,
            "details": details
        })

    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if data.get("status") == "ok":
                    self.log_result("Health Check", True, f"Response: {data}")
                else:
                    self.log_result("Health Check", False, f"Unexpected response: {data}")
            else:
                self.log_result("Health Check", False, f"Status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Health Check", False, f"Request error: {str(e)}")

    def test_consoles_endpoint(self):
        """Test /api/guide/consoles endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/guide/consoles", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if isinstance(data, list) and len(data) == 2:
                    # Check for Wii U console
                    wiiu_found = any(console.get('id') == 'wiiu' for console in data)
                    ds3_found = any(console.get('id') == '3ds' for console in data)
                    
                    if wiiu_found and ds3_found:
                        self.log_result("Consoles Endpoint", True, f"Found {len(data)} consoles")
                        
                        # Test individual console data
                        for console in data:
                            if console.get('id') == 'wiiu':
                                if console.get('status') == 'available':
                                    self.log_result("Wii U Console Data", True, f"Status: {console.get('status')}")
                                else:
                                    self.log_result("Wii U Console Data", False, f"Wrong status: {console.get('status')}")
                            
                            elif console.get('id') == '3ds':
                                if console.get('status') == 'coming_soon':
                                    self.log_result("3DS Console Data", True, f"Status: {console.get('status')}")
                                else:
                                    self.log_result("3DS Console Data", False, f"Wrong status: {console.get('status')}")
                    else:
                        self.log_result("Consoles Endpoint", False, "Missing expected consoles")
                else:
                    self.log_result("Consoles Endpoint", False, f"Unexpected data format: {type(data)}")
            else:
                self.log_result("Consoles Endpoint", False, f"Status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Consoles Endpoint", False, f"Request error: {str(e)}")

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{self.base_url}/api/health", timeout=10)
            cors_header = response.headers.get('Access-Control-Allow-Origin')
            
            if cors_header:
                self.log_result("CORS Headers", True, f"Allow-Origin: {cors_header}")
            else:
                self.log_result("CORS Headers", False, "Missing CORS headers")
                
        except requests.exceptions.RequestException as e:
            self.log_result("CORS Headers", False, f"Request error: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🔍 Testing Hacks.Guide Backend API")
        print(f"Base URL: {self.base_url}")
        print("=" * 50)
        
        self.test_health_endpoint()
        self.test_consoles_endpoint()
        self.test_cors_headers()
        
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print("⚠️ Some backend tests failed!")
            return False

def main():
    tester = HacksGuideAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())