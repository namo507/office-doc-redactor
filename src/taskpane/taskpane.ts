Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById('redact-button')?.addEventListener('click', redactDocument);
    document.getElementById('status').textContent = 'Ready to redact';
  }
});

interface RedactionPattern {
  regex: RegExp;
  name: string;
}

const REDACTION_PATTERNS: RedactionPattern[] = [
  {
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    name: 'Email'
  },
  {
    regex: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g,
    name: 'SSN'
  },
  {
    regex: /\b(?:\+?1[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}\b/g,
    name: 'Phone'
  }
];

async function redactDocument() {
  try {
    updateStatus('Starting redaction process...');
    
    await Word.run(async (context) => {
      const body = context.document.body;
      body.load('text');
      await context.sync();
      
      let redactCount = 0;
      
      for (const pattern of REDACTION_PATTERNS) {
        const searchResults = body.search(pattern.regex.source, {
          matchCase: false,
          matchWholeWord: false,
          ignorePunct: false
        });
        searchResults.load('items');
        await context.sync();
        
        searchResults.items.forEach(item => {
          item.insertText('[REDACTED]', Word.InsertLocation.replace);
          redactCount++;
        });
      }
      
      await addConfidentialHeader(context);
      await enableTrackChanges(context);
      
      await context.sync();
      
      updateStatus(`Redaction complete! ${redactCount} items redacted.`);
    });
  } catch (error) {
    console.error('Error during redaction:', error);
    updateStatus('Error: ' + error.message);
  }
}

async function addConfidentialHeader(context: Word.RequestContext) {
  try {
    updateStatus('Adding confidential header...');
    
    const sections = context.document.sections;
    sections.load('items');
    await context.sync();
    
    const firstSection = sections.items[0];
    const header = firstSection.getHeader(Word.HeaderFooterType.primary);
    
    header.insertParagraph('CONFIDENTIAL DOCUMENT', Word.InsertLocation.start);
    const headerParagraphs = header.paragraphs;
    headerParagraphs.load('items');
    await context.sync();
    
    const confidentialParagraph = headerParagraphs.items[0];
    confidentialParagraph.font.bold = true;
    confidentialParagraph.font.size = 14;
    confidentialParagraph.font.color = 'red';
    confidentialParagraph.alignment = Word.Alignment.centered;
    
    await context.sync();
  } catch (error) {
    console.error('Error adding header:', error);
    updateStatus('Warning: Could not add header');
  }
}

async function enableTrackChanges(context: Word.RequestContext) {
  try {
    if (context.document.changeTrackingMode !== undefined) {
      context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
      await context.sync();
      updateStatus('Track changes enabled');
    }
  } catch (error) {
    console.log('Track changes not available in this Word version');
  }
}

function updateStatus(message: string) {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = message;
  }
  console.log(message);
}
