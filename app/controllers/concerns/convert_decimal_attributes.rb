module ConvertDecimalAttributes
  extend ActiveSupport::Concern

  module ClassMethods
    def convert_decimal(*args)
      args.each do |name|
        module_eval <<-ADD_METHOD
          def #{name}=(value)
            if value.kind_of?(String)
              self[:#{name}] = value.gsub('.', '').gsub(',', '.')
            else
              self[:#{name}] = value
            end
          end
          ADD_METHOD
      end
    end
  end
end
