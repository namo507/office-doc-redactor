# Office Document Redactor

This is my solution for the McCarren Applied AI Challenge. It's a Word Add-in that helps protect sensitive information in documents by automatically redacting emails, phone numbers, and social security numbers. The add-in also adds a confidentiality header with tracking enabled.

## What This Add-in Does

When you open a Word document and click the redaction button, the add-in will:

1. Scan through your entire document looking for sensitive information
2. Replace any emails, phone numbers, and SSNs with [REDACTED] markers
3. Add a "CONFIDENTIAL DOCUMENT" header at the top
4. Enable Track Changes so you can see what was modified

I built this to make document redaction simple and reliable, especially when you need to share documents but want to protect personal information.

## Technical Implementation

The solution uses:
- TypeScript for type-safe code
- Office.js API for Word integration
- Custom CSS for a clean, professional interface
- Regex patterns to identify sensitive data
- Word's Track Changes API (when available)

## Getting Started

### Prerequisites

You'll need:
- Node.js (version 14 or higher)
- npm
- Word Online or Word Desktop

### Installation

1. Clone this repository:
```bash
git clone https://github.com/namo507/office-doc-redactor.git
cd office-doc-redactor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

This will:
- Start a local server on port 3000
- Compile the TypeScript files
- Try to sideload the add-in into Word

If automatic sideloading doesn't work, you can manually sideload the manifest.xml file following Microsoft's guide.

## How to Use

1. Open a Word document
2. Look for the "Document Redactor" tab in the ribbon
3. Click "Show Taskpane" to open the add-in
4. Click the "Redact Document" button
5. The add-in will process your document and show you what was redacted

## What Gets Redacted

The add-in identifies and redacts:
- Email addresses (like john@example.com)
- Phone numbers (various formats including xxx-xxx-xxxx, (xxx) xxx-xxxx)
- Social Security Numbers (xxx-xx-xxxx format)

## Project Structure

```
office-doc-redactor/
├── src/
│   ├── taskpane/
│   │   ├── taskpane.html    # The UI
│   │   ├── taskpane.ts      # Main logic
│   │   └── taskpane.css     # Styling
├── manifest.xml              # Add-in configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── README.md               # This file
```

## Development Notes

I focused on making the code clean and maintainable. The redaction logic is modular, so it's easy to add new patterns if needed. I also made sure to handle edge cases, like documents that don't support Track Changes.

The UI is straightforward but professional. I used custom CSS instead of a library to keep things lightweight and to show attention to design details.

## Testing

I tested this with various documents containing different types of sensitive information. The regex patterns are robust enough to handle different formatting styles while avoiding false positives.

## Future Improvements

If I had more time, I would add:
- Support for more sensitive data types
- Undo functionality
- Batch processing for multiple documents
- Export redacted content report

## Author

Built as part of the McCarren Applied AI Challenge
