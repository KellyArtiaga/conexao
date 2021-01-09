import { Component, OnInit, OnChanges, ViewChild, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { SkillsService } from '../../../../demo/services/skills.service';

@Component({
  selector: 'app-skill-selector',
  templateUrl: './skill-selector.component.html',
  styleUrls: ['./skill-selector.component.scss']
})
export class SkillSelectorComponent implements OnInit {

  @ViewChild('skillList') skillList: ElementRef;
  @ViewChild('skillInput') skillInput: ElementRef;
  @Output() onChange = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  @Input() value = [];
  @Input() selectable = false;
  @Input() possibleSkills = [];
  @Input() placeholder = "Adicionar Skill...";

  public selectedCard = null
  public showSkills = [

  ]

  public selectedSkills = [

  ]

  selectedIndex = -1;



  constructor(private renderer: Renderer2, private service: SkillsService) {
    this.renderer.listen('window', 'keydown', (e) => {
      if (e.key == "Tab" || e.key == "ArrowDown") {
        if (this.selectedIndex < this.showSkills.length -1) {
          e.preventDefault();
          this.skillInput.nativeElement.blur();
          this.selectedIndex = this.selectedIndex + 1;
        }
      }
      else if (e.key == "ArrowUp") {
        e.preventDefault();
        if (this.selectedIndex > 0) {
          this.skillInput.nativeElement.blur();
          this.selectedIndex = this.selectedIndex - 1;
        }
      }
      else if (e.key == "Enter" && this.selectedIndex > -1) {
        e.preventDefault();
        this.selectByFilter(this.selectedIndex);
      }
    })
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(e.target!==this.skillList.nativeElement && e.target !== this.skillInput.nativeElement){
         this.showSkills=[];
     }
    });
   }

  ngOnInit(): void {
    console.log("skillselectorva", this.value)
    this.selectedSkills = this.value;
    console.log("INPUT V", this.possibleSkills)
  }
  ngOnChanges():void {
    console.log("skillselectorva", this.value)
    this.selectedSkills = this.value;
    console.log("INPUT V", this.possibleSkills)
  }

  onFilterChange(value: string): void {



    let v = value.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/-/g, ' ').replace(/[^a-zA-Z0-9]/g, '');

    if (v === "") {
      this.showSkills = [this.possibleSkills[0], this.possibleSkills[1], this.possibleSkills[2], this.possibleSkills[3]]
      return;

    }
    this.showSkills = this.possibleSkills.filter(s => {
      let skill = s.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/-/g, ' ').replace(/[^a-zA-Z0-9]/g, '');

      let selected = this.selectedSkills.filter(selectedS => {
        return selectedS.id == s.id
      });

      if (selected.length > 0) return false;

      let skillWords = skill.split(" ");
      let valWords = v.split(" ");
      let wordsValidComparisons = []

      valWords.forEach(word => {
        skillWords.forEach(skillWord => {
          if (skillWord.indexOf(word) != -1 || this.getSimilarity(skillWord, word) > 0.5) {
            wordsValidComparisons.push(word)
          }
        })
      })

      if (wordsValidComparisons.length === valWords.length) {
        return true;
      }

      return false;
    })

    this.showSkills.sort((a, b) => {
      var aSim = this.getSimilarity(a.nome, v);
      var bSim = this.getSimilarity(b.nome, v);
      if ( aSim > bSim ) {
        return 1;
      }
      else if (bSim > aSim) {
        return -1;
      }
      else {
        return 0;
      }
    })

  }


  getSimilarity(val1, val2): number {
    // Retorna grau de similaridade entre 0-1
    var v1 = val1;
    var v2 = val2;
    if (v1.length < v2.length) {
      v2 = val1;
      v1 = val2;
    }

    var matches = [];
    var indexReducer = 0;

    var splittedV1 = v1.split("");

    for (let i = 0; i < v2.length; i++) {
      for (let i2 = 0; i2 < splittedV1.length; i2++) {
        if (splittedV1[i2] == v2[i]) {
          matches.push(v2[i]);
          splittedV1.splice(0, i2 + 1);
          break;
        }
      }

    }

    return matches.length / v1.length;
  }

  selectByFilter(index: number): void {
    this.selectedSkills.push(this.showSkills[index])
    this.skillInput.nativeElement.value = this.placeholder
    this.showSkills = [];
    this.selectedIndex = -1;
    this.onChange.emit(this.selectedSkills);
    this.selectedCard = this.selectedSkills.length - 1
    this.onSelect.emit(this.selectedSkills[this.selectedCard])
  }

  removeSelected(index: number): void {
    this.onRemove.emit(this.selectedSkills[index])

    this.selectedSkills.splice(index,1);
    if (this.selectedCard === index) {
      this.selectedCard = null;
      this.onSelect.emit(null)
    }
    this.onChange.emit(this.selectedSkills);
  }

  changeSelectedCard(index: number): void{
    if (!this.selectable) {
      return;
    }

    this.selectedCard = index
    this.onSelect.emit(this.selectedSkills[index])
  }
}
