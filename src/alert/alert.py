from twilio.rest import Client


def send_sms_alert(account_sid, auth_token, from_number, to_number, message):
    try:
        # Initialize the Twilio client
        client = Client(account_sid, auth_token)

        # Send the SMS
        client.messages.create(
            body=message,
            from_=from_number,
            to=to_number
        )

        print("SMS alert sent successfully!")

    except Exception as e:
        print(f"Error sending SMS alert: {str(e)}")
