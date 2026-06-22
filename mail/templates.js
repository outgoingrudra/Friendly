export function welcomeTemplate(name) {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4ff; padding: 48px 16px; min-height: 100vh;">
    <div style="max-width: 520px; margin: auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.08);">
      
      <!-- Header Band -->
      <div style="background: linear-gradient(135deg, #3b82f6, #ec4899); padding: 40px 30px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 12px;">👋</div>
        <h1 style="margin: 0; color: white; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
          Welcome to Friendly
        </h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
          Your social space starts here
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 36px 32px; text-align: center;">
        <h2 style="margin: 0 0 12px; color: #1e293b; font-size: 20px;">
          Hey ${name}! 🎉
        </h2>
        <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
          We're thrilled to have you on board. Connect with people, share moments, and build meaningful friendships.
        </p>

        <!-- Divider -->
        <div style="border-top: 1px solid #f1f5f9; margin-bottom: 28px;"></div>

        <!-- Features -->
        <div style="text-align: left; display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
            <span style="font-size: 22px;">🤝</span>
            <div>
              <p style="margin: 0; font-weight: 600; color: #1e293b; font-size: 14px;">Connect with people</p>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Send and accept friend requests</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
            <span style="font-size: 22px;">💬</span>
            <div>
              <p style="margin: 0; font-weight: 600; color: #1e293b; font-size: 14px;">Chat in real-time</p>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Message your connections instantly</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
            <span style="font-size: 22px;">✨</span>
            <div>
              <p style="margin: 0; font-weight: 600; color: #1e293b; font-size: 14px;">Share your story</p>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Post updates and moments</p>
            </div>
          </div>
        </div>

        <!-- CTA Badge -->
        <div style="margin-top: 28px; padding: 14px; background: linear-gradient(135deg, #eff6ff, #fdf2f8); border-radius: 12px; border: 1px solid #e0e7ff;">
          <p style="margin: 0; color: #3b82f6; font-weight: 700; font-size: 15px;">You're all set to go 🚀</p>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Your profile is ready. Start exploring!</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 20px 32px; background: #f8fafc; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="margin: 0; color: #cbd5e1; font-size: 12px;">
          © 2026 Friendly · Made with ❤️
        </p>
      </div>

    </div>
  </div>
  `;
}