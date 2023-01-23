# Preview all emails at http://localhost:3000/rails/mailers/inventory_notifier_mailer
class InventoryNotifierMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/inventory_notifier_mailer/notification
  def notification
    InventoryNotifierMailer.notification
  end

end
