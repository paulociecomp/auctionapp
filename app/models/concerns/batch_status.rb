module BatchStatus
  BATCH_STATUS = {
    open:  "open",
    sold: "sold"
  }

  instance_eval do
    BATCH_STATUS.each_pair do |type, value|
      define_method("#{type}?") do
        status == value
      end
    end
  end
end
