class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true

  private

  def after_sign_out_path_for(_resource)
    root_path
  end
end
