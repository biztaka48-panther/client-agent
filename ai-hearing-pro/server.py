"""
ローカルプロキシサーバー
- 静的ファイル（index.html等）を配信
- /api/messages へのリクエストを Anthropic API に転送（CORS回避）
"""
import http.server
import json
import urllib.request
import urllib.error
import os
import sys

class ProxyHandler(http.server.SimpleHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Api-Key')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/messages':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                api_key = self.headers.get('X-Api-Key', '')

                req = urllib.request.Request(
                    'https://api.anthropic.com/v1/messages',
                    data=body,
                    headers={
                        'Content-Type': 'application/json',
                        'x-api-key': api_key,
                        'anthropic-version': '2023-06-01',
                    },
                    method='POST'
                )

                with urllib.request.urlopen(req) as response:
                    resp_body = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(resp_body)

            except urllib.error.HTTPError as e:
                error_body = e.read()
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(error_body)

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': {'message': str(e)}}).encode())
        else:
            super().do_POST()

    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")


if __name__ == '__main__':
    port = 8080
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)

    server = http.server.HTTPServer(('', port), ProxyHandler)
    print(f'[OK] Server running: http://localhost:{port}')
    print(f'     Dir: {base_dir}')
    print('     Press Ctrl+C to stop\n')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped.')
        sys.exit(0)
