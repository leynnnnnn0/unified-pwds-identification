<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>PWD Identification Card</title>
    <style>
        @page {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        .pwd-card {
            width: 85.6mm;
            height: 54mm;
            position: relative;
            background: linear-gradient(135deg, #f9f9f9, #ffffff);
            border: 1px solid #333;
            border-radius: 2.5mm;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            padding: 3mm;
            margin: 0 auto;
            transform: rotate(90deg) translateY(-15.8mm);
            transform-origin: bottom left;
        }

        .header {
            text-align: center;
            margin-bottom: 2mm;
            border-bottom: 1px solid #0066cc;
            padding-bottom: 1mm;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .gov-logo {
            height: 8mm;
            margin-right: 2mm;
        }

        .title-container {
            display: inline-block;
        }

        .header h1 {
            margin: 0;
            font-size: 12pt;
            color: #0066cc;
            letter-spacing: 0.5px;
        }

        .header h2 {
            margin: 0;
            font-size: 8pt;
            font-weight: normal;
            color: #333;
        }

        .card-content {
            display: flex;
            margin-top: 2mm;
        }

        .photo-section {
            width: 25mm;
            height: 30mm;
            border: 1px solid #ccc;
            overflow: hidden;
            margin-right: 3mm;
            background-color: #f5f5f5;
        }

        .photo-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .info-section {
            flex: 1;
            font-size: 7pt;
        }

        .card-field {
            margin-bottom: 1.2mm;
            line-height: 1.2;
        }

        .card-field .label {
            font-weight: bold;
            display: inline-block;
            width: 18mm;
            color: #0066cc;
        }

        .card-field .value {
            font-weight: normal;
            color: #333;
        }

        .card-number {
            position: absolute;
            bottom: 2mm;
            left: 5mm;
            font-size: 8pt;
            font-weight: bold;
            color: #0066cc;
        }

        .valid-until {
            position: absolute;
            bottom: 2mm;
            right: 5mm;
            font-size: 8pt;
            color: #333;
        }

        .signature {
            margin-top: 4mm;
            border-top: 1px solid #999;
            width: 25mm;
            text-align: center;
            font-size: 6pt;
            color: #666;
            padding-top: 1mm;
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.05;
            font-size: 40pt;
            font-weight: bold;
            color: #0066cc;
            pointer-events: none;
            z-index: -1;
        }

        .card-footer {
            position: absolute;
            bottom: 7mm;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 5pt;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="pwd-card">
        <div class="watermark">PWD</div>

        <div class="header">
            <!-- Replace with actual logo or remove if not available -->
            <div class="title-container">
                <h1>PWD IDENTIFICATION CARD</h1>
                <h2>Republic of the Philippines</h2>
            </div>
        </div>

        <div class="card-content">
            <div class="photo-section">
                @if($photo_url)
                <img src="{{ $photo_url }}" alt="ID Photo">
                @else
                <div style="text-align: center; padding-top: 10mm; font-size: 7pt; color: #999;">No Photo Available</div>
                @endif
            </div>

            <div class="info-section">
                <div class="card-field">
                    <span class="label">Name:</span>
                    <span class="value">{{ $card_holder }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Address:</span>
                    <span class="value">{{ $address }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Birthdate:</span>
                    <span class="value">{{ $birthdate }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Gender:</span>
                    <span class="value">{{ $gender }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Disability:</span>
                    <span class="value">{{ $disability_type }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Blood Type:</span>
                    <span class="value">{{ $blood_type }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Emergency:</span>
                    <span class="value">{{ $emergency_contact_person }}</span>
                </div>
                <div class="card-field">
                    <span class="label">Contact:</span>
                    <span class="value">{{ $emergency_contact_number }}</span>
                </div>

                <div class="signature">Cardholder's Signature</div>
            </div>
        </div>

        <div class="card-number">PWD ID: {{ $pwd_card_number }}</div>
        <div class="valid-until">Valid until: {{ $effective_date }}</div>
        <div class="card-footer">This card is the property of the Government of the Republic of the Philippines</div>
    </div>
</body>

</html>