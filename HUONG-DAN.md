# Hướng dẫn đưa web lên mạng (miễn phí)
1. Tạo tài khoản github.com, tạo repo mới (Public), tải toàn bộ file trong thư mục này lên (Add file → Upload files).
2. Sửa admin/config.yml: thay TEN-GITHUB/TEN-REPO bằng tên của bạn.
3. Vào netlify.com → đăng nhập bằng GitHub → Add new site → Import from GitHub → chọn repo → Deploy. Bạn có địa chỉ xxx.netlify.app (đổi tên trong Site configuration → Change site name).
4. Bật đăng nhập quản trị:
   - GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
     Homepage URL: https://xxx.netlify.app ; Callback URL: https://api.netlify.com/auth/done
   - Copy Client ID, tạo Client Secret.
   - Netlify → Site configuration → Access & security → OAuth → Install provider → GitHub → dán ID và Secret.
5. Vào https://xxx.netlify.app/admin → Login with GitHub → đăng bài. Bấm Publish, khoảng 1 phút sau bài sẽ hiện trên trang.
Thêm quản trị viên khác: GitHub repo → Settings → Collaborators → mời họ.
