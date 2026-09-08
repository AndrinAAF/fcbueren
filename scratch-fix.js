const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // page.tsx was manually fixed but I did git restore, so let's just let the script do page.tsx too!
  
  // Tables
  content = content.replace(/FROM News\b/g, 'FROM "News"');
  content = content.replace(/UPDATE News\b/g, 'UPDATE "News"');
  content = content.replace(/INTO News\b/g, 'INTO "News"');
  
  content = content.replace(/FROM Comment\b/g, 'FROM "Comment"');
  content = content.replace(/UPDATE Comment\b/g, 'UPDATE "Comment"');
  content = content.replace(/INTO Comment\b/g, 'INTO "Comment"');
  
  content = content.replace(/FROM Event\b/g, 'FROM "Event"');
  content = content.replace(/UPDATE Event\b/g, 'UPDATE "Event"');
  content = content.replace(/INTO Event\b/g, 'INTO "Event"');
  
  content = content.replace(/FROM TeamSettings\b/g, 'FROM "TeamSettings"');
  content = content.replace(/UPDATE TeamSettings\b/g, 'UPDATE "TeamSettings"');
  content = content.replace(/INTO TeamSettings\b/g, 'INTO "TeamSettings"');

  let regex = /`([^`]+)`/g;
  content = content.replace(regex, (match, p1) => {
    if (!/SELECT|UPDATE|INSERT|DELETE|FROM/.test(p1)) return match;
    
    let sql = p1;
    // Replace columns only if they are not preceded by ${
    sql = sql.replace(/(?<!\$\{)\bnewsId\b/g, '"newsId"');
    sql = sql.replace(/(?<!\$\{)\bparentId\b/g, '"parentId"');
    sql = sql.replace(/(?<!\$\{)\bcreatedAt\b/g, '"createdAt"');
    sql = sql.replace(/(?<!\$\{)\bupdatedAt\b/g, '"updatedAt"');
    sql = sql.replace(/(?<!\$\{)\bteamSlug\b/g, '"teamSlug"');
    sql = sql.replace(/(?<!\$\{)\bimageUrl\b/g, '"imageUrl"');
    sql = sql.replace(/(?<!\$\{)\blinkUrl\b/g, '"linkUrl"');
    sql = sql.replace(/(?<!\$\{)\bauthorName\b/g, '"authorName"');
    sql = sql.replace(/(?<!\$\{)\bauthorEmail\b/g, '"authorEmail"');
    return '`' + sql + '`';
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log('Fixed ' + file);
  }
});

console.log('Total files changed: ' + changedCount);
